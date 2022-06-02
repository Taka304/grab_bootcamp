import torch
from torch.utils.data import DataLoader, Dataset
from tokenizers.pre_tokenizers import Whitespace
from transformers import AutoTokenizer, AutoModelForTokenClassification

from datetime import datetime, timedelta
from tqdm import tqdm
import numpy as np
import argparse

import config
from db import histories_collection



def get_data_from_annotation_histories(hours):
    pre_tokenizer = Whitespace()
    text_docs = []
    tag_docs = []

    dt = datetime.now() - timedelta(hours=hours)
    query = {"time": {"$gt": dt}}
    for annotation in histories_collection.find(query):
        text = annotation['processed_text']
        words = text.split(' ')
        # masks of tags for each characters
        masks = ['O'] * len(text)
        # support to convert word-based index to character-based index
        cum_len = [len(word) for word in words]
        for i in range(1, len(cum_len)):
            cum_len[i] += cum_len[i-1] 

        user_ann = annotation['user_annotated']
        for i in range(len(user_ann)):
            # from word-based index
            start = user_ann[i]['start']
            end = user_ann[i]['end']
            # to character-based index
            if start > 0:
                start = cum_len[start-1] + start
            end = cum_len[end-1] + end-1
            # mark label in masks
            for j in range(start, end):
                masks[j] = user_ann[i]['entity_group']
        
        tokens = pre_tokenizer.pre_tokenize_str(text)
        texts = []
        tags = []
        for token, loc in tokens:
            texts.append(token)
            tag = masks[loc[0]]
            if tag != 'O':                
                if loc[0] == 0:
                    tag = 'B-' + tag
                else:
                    if masks[loc[0]-1] == tag:
                        tag = 'I-' + tag
                    else:
                        tag = 'B-' + tag
            tags.append(tag)
        
        text_docs.append(texts)
        tag_docs.append(tags)
    
    return text_docs, tag_docs


def encode_tags(tags, encodings, tag2id):
    labels = [[tag2id[tag] for tag in doc] for doc in tags]
    encoded_labels = []
    for doc_labels, doc_offset in zip(labels, encodings.offset_mapping):
        # create an empty array of -100
        doc_enc_labels = np.ones(len(doc_offset),dtype=int) * -100
        arr_offset = np.array(doc_offset)

        # set labels whose first offset position is 0 and the second is not 0
        doc_enc_labels[(arr_offset[:,0] == 0) & (arr_offset[:,1] != 0)] = doc_labels
        encoded_labels.append(doc_enc_labels.tolist())

    return encoded_labels


class HistoryDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)


def train(text_docs, tag_docs, n_epoch):
    tokenizer = AutoTokenizer.from_pretrained(config.TOKENIZER_DIR)

    # Encodings for tokens and tags
    unique_tags = set(['O','B-PER','I-PER','B-LOC','I-LOC','B-ORG','I-ORG','B-MISC','I-MISC'])
    tag2id = {tag: i for i, tag in enumerate(unique_tags)}
    id2tag = {i: tag for tag, i in tag2id.items()}
    train_encodings = tokenizer(text_docs, is_split_into_words=True, return_offsets_mapping=True, padding=True, truncation=True)
    train_labels = encode_tags(tag_docs, train_encodings, tag2id)

    # Create dataset
    train_encodings.pop("offset_mapping")
    train_dataset = HistoryDataset(train_encodings, train_labels)

    # Load model
    model = AutoModelForTokenClassification.from_pretrained(config.MODEL_DIR, num_labels=len(unique_tags))
   
    # Training
    device = torch.device('cpu')

    model.to(device)
    model.train()

    train_loader = DataLoader(train_dataset, batch_size=1, shuffle=True)

    optim = torch.optim.AdamW(model.parameters(), lr=5e-5)

    for epoch in tqdm(range(n_epoch)):
        for batch in train_loader:
            optim.zero_grad()
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)
            outputs = model(input_ids, attention_mask=attention_mask, labels=labels)
            loss = outputs[0]
            loss.backward()
            optim.step()

    model.save_pretrained('model/')
    print("Model is saved in 'model/' .")



if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--device', choices=['cuda', 'cpu'], default='cpu')
    parser.add_argument('--hours', type=int, default=72)
    parser.add_argument('--epoch', type=int, default=1)

    args = parser.parse_args()

    print("==== Training with recent annotations histories:")
    
    device = args.device
    if device == 'cuda' and not torch.cuda.is_available():
        device = 'cpu'
    print("Device:", device)
    print("------------")
    text_docs, tag_docs = get_data_from_annotation_histories(args.hours)
    n = len(text_docs)
    print('Number of annotation records in histories:', n)
    if n > 0:
        train(text_docs, tag_docs, args.epoch)

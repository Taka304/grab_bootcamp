from transformers import AutoTokenizer, AutoModelForTokenClassification
import sys

def load_model():
    tokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")
    model = AutoModelForTokenClassification.from_pretrained("dslim/bert-base-NER")
    global ner_model
    ner_model = {"model": model, "tokenizer": tokenizer}
from transformers import pipeline, AutoTokenizer, AutoModelForTokenClassification
from flask import jsonify
import numpy as np
import re


def preprocess(text):
    text = text.strip()
    text = re.sub(r'[^aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0123456789\-.,?!_()@$\'\"“’” ]', ' ', text)
    text = re.sub(' +', ' ', text)
    return text

def recognize(ner_model, text):
    processed_text = preprocess(text)
    nlp = pipeline("ner", model=ner_model['model'], 
                    tokenizer=ner_model['tokenizer'],
                    aggregation_strategy="first")
    predictions = nlp(processed_text)

    colors = {
        'ORG': "#00aeff",
        'PER': "#3369e7",
        'LOC': "#8e43e7",
        'MISC': "#b84592",
    }
    
    # count prediction for each entities
    entities_count = {
        "PER": 0,
        "LOC": 0,
        "ORG": 0,
        "MISC": 0 
    }

    # # support to mark prediction by word index instead of character index
    # cnt_spaces_before = [0] * len(processed_text)
    # for i in range(1, len(processed_text)):
    #     cnt_spaces_before[i] = cnt_spaces_before[i-1]
    #     if processed_text[i] == ' ':
    #         cnt_spaces_before[i] += 1

    for i in range(len(predictions)):        
        predictions[i]['color'] = colors[predictions[i]['entity_group']]
        entities_count[predictions[i]['entity_group']] += 1
        # Handle error: "Object of type float32 is not JSON serializable"
        predictions[i]['score'] =  np.float64(predictions[i]['score'])
        # # mark prediction by word index instead of character index
        # start = cnt_spaces_before[predictions[i]['start']]
        # end = cnt_spaces_before[predictions[i]['end'] - 1] + 1
        # predictions[i]['start'] = start
        # predictions[i]['end'] = end

    return jsonify({
        "processed_text": processed_text,
        "entities_count": entities_count,
        "predictions": predictions
    })


def load_model():
    # In default, models will be stored in cache:
    # transformers.file_utils.default_cache_path
    tokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")
    model = AutoModelForTokenClassification.from_pretrained("dslim/bert-base-NER")
    global ner_model
    ner_model = {"model": model, "tokenizer": tokenizer}
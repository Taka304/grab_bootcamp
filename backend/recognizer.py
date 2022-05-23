from transformers import pipeline, AutoTokenizer, AutoModelForTokenClassification
from flask import jsonify
import numpy as np
import re


def preprocess(text):
    text = text.strip()
    text = re.sub(' +', ' ', text)
    # todo
    return text

def recognize(ner_model, text):
    processed_text = preprocess(text)
    nlp = pipeline("ner", model=ner_model['model'], tokenizer=ner_model['tokenizer'])
    ner_results = nlp(processed_text)

    # Handle error: "Object of type float32 is not JSON serializable"
    for i in range(len(ner_results)):
        ner_results[i]['score'] = np.float64(ner_results[i]['score'])

    return jsonify({
        "processed_text": processed_text,
        "predictions": ner_results
    })


def load_model():
    tokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")
    model = AutoModelForTokenClassification.from_pretrained("dslim/bert-base-NER")
    global ner_model
    ner_model = {"model": model, "tokenizer": tokenizer}
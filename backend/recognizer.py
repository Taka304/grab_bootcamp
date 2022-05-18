from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline


def preprocess(text):
    # todo
    return text.strip()

def recognize(model, text):
    processed_text = preprocess(text)
    # todo
    return {
        "processed_text": processed_text,
        "predictions": [
            {
                "entity_group": "PER",
                "score": 0.9964176416397095,
                "word": "Clara",
                "start": 11,
                "end": 16
            },
            {
                "entity_group": "LOC",
                "score": 0.9961979985237122,
                "word": "Berkeley",
                "start": 31,
                "end": 39
            },
        ]
    }
    

def load_model():
    # todo
    return "Bert-based model"
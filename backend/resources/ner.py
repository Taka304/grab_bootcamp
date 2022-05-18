from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required
import recognizer
import sys


class Ner(Resource):
    def __init__(self):
        self.ner_model = recognizer.load_model()

    def get(self):
        return {"data": {"Info": "Welcome to NER!!"}}, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('text', type=str, required=True,
                        help='Input text cannot be blank')
        args = parser.parse_args()

        text = args['text']

        # todo

        print(self.ner_model, file=sys.stderr)
        return recognizer.recognize(self.ner_model, text)

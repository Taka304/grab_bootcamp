from flask_restful import Resource, reqparse
from app import ner_model
import recognizer


class Ner(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('text', type=str, required=True,
                        help='Input text cannot be blank')

    def post(self):
        args = Ner.parser.parse_args()
        text = str(args['text'])
        return recognizer.recognize(ner_model, args['text'])

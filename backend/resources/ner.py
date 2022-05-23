from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required
import recognizer


class Ner(Resource):

    def get(self):
        return {"data": {"Info": "Welcome to NER!!"}}, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('text', type=str, required=True,
                        help='Input text cannot be blank')
        args = parser.parse_args()

        text = args['text']

        # todo

        return recognizer.recognize(recognizer.ner_model, text)

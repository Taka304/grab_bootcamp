from flask import Flask
from flask_jwt_extended import JWTManager
from flask_restful import Api

from resources import ner, user
import recognizer
import config


app = Flask(__name__)
app.config.from_object(config)
jwt = JWTManager(app)
api = Api(app)


# @app.before_first_request
def init():
    app.logger.info('Load NER model ...')
    # recognizer has global ner_model
    recognizer.load_model()
    app.logger.info('Model loaded.')


# RESTful APIs
api.add_resource(ner.Ner, '/ner')
api.add_resource(user.Login, '/login')
api.add_resource(user.Register, '/register')
api.add_resource(user.Histories, '/histories')


if __name__ == "__main__":
    init()
    app.run(debug=app.config['DEBUG'])
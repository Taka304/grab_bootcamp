from flask import Flask
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_cors import CORS
import config


app = Flask(__name__)
app.config.from_object(config)
jwt = JWTManager(app)
api = Api(app)
CORS(app)

with app.app_context():
    import recognizer
    app.logger.info('Load NER model ...')
    ner_model = recognizer.load_model()
    app.logger.info('Model loaded.')


from resources import ner, user

# REST APIs
api.add_resource(ner.Ner, '/ner')
api.add_resource(user.Login, '/login')
api.add_resource(user.Register, '/register')
api.add_resource(user.Histories, '/histories')
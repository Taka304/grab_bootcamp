from flask import Flask
from flask_jwt_extended import JWTManager
from flask_restful import Api

from resources.ner import Ner
import recognizer
import config


app = Flask(__name__)
app.config.from_object(config)
jwt = JWTManager(app)
api = Api(app)


@app.before_first_request
def init():
    recognizer.load_model()


# RESTful APIs
api.add_resource(Ner, '/ner')


if __name__ == "__main__":
    app.run(debug=app.config['DEBUG'])
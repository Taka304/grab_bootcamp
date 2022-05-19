from flask import Flask
from flask_jwt_extended import JWTManager
from flask_restful import Api

from resources.ner import Ner
import settings


app = Flask(__name__)
app.config['SECRET_KEY'] = '4247325b9d110a97fac0a946cdfbcdb9'
app.config["JWT_SECRET_KEY"] = "grab.bootcamp.ner.demo"
jwt = JWTManager(app)
api = Api(app)


@app.before_first_request
def init():
    settings.load_model()


api.add_resource(Ner, '/ner')


if __name__ == "__main__":
    app.run(debug=True)
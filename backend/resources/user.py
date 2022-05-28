from flask_jwt_extended import create_access_token, jwt_required
from flask_restful import Resource, reqparse
from flask import jsonify
from datetime import datetime
import json, hashlib, re
from db import users_collection, histories_collection


class Login(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('email', type=str, required=True,
                        help='This field cannot be blank')
    parser.add_argument('password', type=str, required=True,
                        help='This field cannot be blank')

    def post(self):
        ''' Handle Login request '''
        data = Login.parser.parse_args()
        email = data['email']
        password = data['password']

        # search for user in database
        user_from_db = users_collection.find_one({'email': email})  
        if user_from_db:
            encrypted_password = hashlib.sha256(password.encode("utf-8")).hexdigest()
            if encrypted_password == user_from_db['password']:
                # create jwt token
                access_token = create_access_token(identity={'email': user_from_db['email'],
                                                            'username': user_from_db['username']}) 
                return jsonify(access_token=access_token), 200
        return jsonify({'msg': 'The email or password is incorrect'})



class Register(Resource):

    parser = reqparse.RequestParser() 
    parser.add_argument('username', type=str, required=True,
                        help='This field cannot be left blank')
    parser.add_argument('email', type=str, required=True,
                        help='This field cannot be blank')
    parser.add_argument('password', type=str, required=True,
                        help='This field cannot be left blank')

    def post(self):
        ''' Handle Register request '''
        new_user = Register.parser.parse_args()

        # validation email
        if not re.fullmatch('[^@]+@[^@]+\.[^@]+', new_user['email']):
            return jsonify({'msg': 'Email is not valid'}), 400
        # check if email exist
        if users_collection.find_one({"email": new_user["email"]}):
            return jsonify({'msg': 'Email is already used'}), 400

        # todo: add more constraints checking for password before hashing
        new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest()

        try:
            users_collection.insert_one(new_user)
            return jsonify({'msg': 'User created successfully'}), 201
        except:
            return jsonify({'msg': 'Error in inserting new user'}), 400
        

class Histories(Resource):

    @jwt_required()
    def get(self):
        ''' Get user's annotations histories '''
        current_user = get_jwt_identity()
        email = current_user['email']
        try:
            histories = histories_collection.find({'email': email})  
            return jsonify({'data': histories}), 200
        except:
            return jsonify({'msg': 'Error in retrieving annotations histories'}), 400
    
    @jwt_required()
    def post(self):
        ''' Add annotation to histories '''
        parser = reqparse.RequestParser() 
        parser.add_argument('model_predicted', type=str, required=True,
                        help='This field cannot be left blank')
        parser.add_argument('user_annotated', type=str, required=True,
                        help='This field cannot be left blank')
        data = parser.parse_args()

        current_user = get_jwt_identity()
        data['time'] = datetime.now()
        data['email'] = current_user['email']

        try:
            histories_collection.insert_one(data)
            return jsonify({'msg': 'Update annotation histories successfully'}), 201
        except:
            return jsonify({'msg': 'Error in inserting new annotation'}), 400


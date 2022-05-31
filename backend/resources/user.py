from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity 
from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
from flask import jsonify, make_response, request
from datetime import datetime
import json, hashlib, re
from db import users_collection
from db import histories_collection


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
                return  make_response(jsonify(access_token=access_token), 200)
        return  make_response('The email or password is incorrect', 403)  # Forbidden



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
            return  make_response('Email is not valid', 401)  # Lacks valid
        # check if email exist
        if users_collection.find_one({"email": new_user["email"]}):
            return  make_response('Email is already used', 409)  # Conflict

        # todo: add more constraints checking for password before hashing
        new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest()

        try:
            users_collection.insert_one(new_user)
            return make_response('User created successfully', 201)
        except:
            return make_response('Error in creating new user', 500)  # server db error
        

class Histories(Resource):

    @jwt_required()
    def get(self):
        ''' Get user's annotations histories '''
        current_user = get_jwt_identity()
        email = current_user['email']
        try:
            data = histories_collection.find({'email': email})
            histories = list(data)
            if len(histories):
                for i in range(len(histories)):
                    del histories[i]['_id']
                    del histories[i]['email']
                return make_response(jsonify({'histories': histories}), 200)
            return make_response('Annotations histories not found', 404)  # not found
        except:
            return make_response('Error in retrieving annotations histories', 400)
    
    @jwt_required()
    def post(self):
        ''' Add annotation to histories '''
        data = request.get_json()
        if not all (k in data.keys() for k in ('model_predicted', 'user_annotated')):
            return make_response("'model_predicted' or 'user_annotated' is missing", 201)

        current_user = get_jwt_identity()
        data['time'] = datetime.now()
        data['email'] = current_user['email']

        try:
            histories_collection.insert_one(data)
            return make_response('Update annotation histories successfully', 201)
        except:
            return make_response('Error in adding annotation to histories', 500)


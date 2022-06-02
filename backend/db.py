from pymongo import MongoClient
import config

client = MongoClient(host=config.DB_HOST, port=config.DB_PORT)
db = client['bootcamp_db']
users_collection = db['users']
histories_collection = db['histories']

import datetime

DEBUG = True
SECRET_KEY = '4247325b9d110a97fac0a946cdfbcdb9'
DB_HOST = 'mongodb://localhost'
DB_PORT = 27017
JWT_SECRET_KEY = 'grab.bootcamp.jwt'
JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(days=1)
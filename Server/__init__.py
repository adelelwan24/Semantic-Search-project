from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv(
    'SQLALCHEMY_TRACK_MODIFICATIONS')

db = SQLAlchemy(app)
CORS(app)
Marshmallow(app)
bcrypt = Bcrypt(app)

# @app.after_request
# def after_request(response):
#     response.headers.add('Access-Control-Allow-Header','Content-Type,Authorization,true')
#     response.headers.add('Access-Control_Allow-Methods' ,'GET,POST,DELETE,PATCH,OPTIONS')
#     return response

# from .models import *
# with app.app_context():
#     db.create_all()

from Server import routes
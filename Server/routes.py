from Server import app, db, bcrypt
from Server.Utils.utils import Exception_Info
from Server.Utils.pre_processor import Pre_Process, Format_Results
from Server.Utils.vdb import VectorDatabase
from Server.Utils.model import model
from flask import request, abort, jsonify
from flask_api import status ,exceptions
from .schemas import UserCreationSchema, UserLoginSchema, UserSchema
from sqlalchemy.exc import SQLAlchemyError
from .models import User

#### Schemas
userSchema = UserSchema()
userCreationSchema = UserCreationSchema()
userLoginSchema = UserLoginSchema()

#### Initiate the Vector Database
vdb = VectorDatabase()
vdb.VDB_connect()
vdb.load_papers()
vdb.load_videos()




@app.route('/')
@app.route('/home')
def home():
    return 'hello world'


################################################################################
'''
Users
'''
################################################################################

@app.route('/users')
@app.route('/users/all')
def all_users():
    users = User.query.all()
    return jsonify(userSchema.dump(users, many=True))

@app.route('/users/<int:id>')
def get_user_by_id(id):
    user = User.query.filter(User.id == id ).first_or_404()
    return jsonify(userSchema.dump(user))

@app.route('/users/create', methods=['post'])
def create_user():

    data = userCreationSchema.load(data=request.json)
    user = User(**data)   

    try:
        db.session.add(user)
        db.session.commit()
    except SQLAlchemyError as exe:
        db.session.rollback()
        Exception_Info()
        raise exe

    return jsonify(userSchema.dump(user)), status.HTTP_201_CREATED

@app.route('/users/login', methods=['post'])
def login_user():
    data = userLoginSchema.load(request.json)
    user = User.query.filter(User.email_address == data['email_address']).one_or_none()
    if not user:
        abort(status.HTTP_404_NOT_FOUND, "Email Doesn't Exist")
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({'messege' : 'Successfully Logged In'})
    abort(status.HTTP_401_UNAUTHORIZED, "Password Is Invalid")
    

@app.route('/users/<int:id>', methods= ['delete'])
def delete_user(id):
    user_query = User.query.filter(User.id == id)
    if not user_query.one_or_none():
        abort(status.HTTP_404_NOT_FOUND, "User Doesn't Exist")
    
    try:
        user = user_query.first()
        db.session.delete(user)
        db.session.commit()
    except SQLAlchemyError as exe:
        db.session.rollback()
        Exception_Info()
        raise exe

    return jsonify(userSchema.dump(user)), status.HTTP_204_NO_CONTENT


################################################################################
'''
Search
'''
################################################################################

@app.route('/videos/search')
def search_video():
    args = request.args
    query = args.get('query', None, str)
    offset = args.get('offset', 0 , int)
    processed_query = Pre_Process(query)
    encoded = model.encode(processed_query)
    results = vdb.Search_VDB_videos([encoded], offset=offset)
    results = Format_Results(results)
    return jsonify(results)



@app.route('/papers/search')
def search_papers():
    args = request.args
    query = args.get('query', None, str)
    offset = args.get('offset', 0 , int)
    processed_query = Pre_Process(query)
    encoded = model.encode(processed_query)
    results = vdb.Search_VDB_videos([encoded], offset=offset)
    results = Format_Results(results)
    return jsonify(results)

from Server.error_handlers import *
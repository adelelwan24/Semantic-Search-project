from .schemas import UserCreationSchema, UserLoginSchema, UserSchema
from flask import request, abort, jsonify, Blueprint, current_app
from sqlalchemy.exc import SQLAlchemyError
from Server import db, bcrypt
from flask_api import status
from .models import User
import datetime
from jose import jwt
from Server.auth.auth import requires_auth, requires_admin

users = Blueprint('users', __name__, url_prefix='/users')


#### Schemas
userSchema = UserSchema()
userLoginSchema = UserLoginSchema()
userCreationSchema = UserCreationSchema()


#### Routes
@users.route('/')
@users.route('/all')
@requires_admin
def all_users(current_user):
    users = User.query.all()
    return jsonify(userSchema.dump(users, many=True))


@users.route('/create', methods=['post'])
def create_user():

    data = userCreationSchema.load(data=request.json)
    user = User(**data)

    try:
        db.session.add(user)
        db.session.commit()
    except SQLAlchemyError as exe:
        db.session.rollback()
        raise exe

    return jsonify(userSchema.dump(user)), status.HTTP_201_CREATED


@users.route('/login', methods=['post'])
def login_user():
    data = userLoginSchema.load(request.json)
    user = User.query.filter(User.email_address ==
                             data['email_address']).one_or_none()
    if not user:
        abort(status.HTTP_404_NOT_FOUND, "Email Doesn't Exist")
        
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        payload = {'id' : user.id, 'admin' :  user.admin, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}
        token = jwt.encode(payload, current_app.config.get('SECRET_KEY'))

        return jsonify({'messege': 'Successfully Logged In',
                        'token' : token})
    abort(status.HTTP_401_UNAUTHORIZED, "Password Is Invalid")


@users.route('/info')
@requires_auth
def get_user_info(current_user):
    if not current_user:
        abort(status.HTTP_403_FORBIDDEN, 'Forbidden Access To Resource')
    user = User.query.filter(User.id == current_user.id).first_or_404('User Not Found')
    return jsonify(userSchema.dump(user))


@users.route('/<int:id>')
@requires_auth
def get_user_by_id(current_user, id):
    if current_user.id != id:
        abort(status.HTTP_403_FORBIDDEN, 'Forbidden Access To Resource')
    user = User.query.filter(User.id == id).first_or_404('User Not Found')
    return jsonify(userSchema.dump(user))


@users.route('/<int:id>', methods=['delete'])
@requires_auth
def delete_user(current_user, id):
    if current_user.id != id:
        abort(status.HTTP_403_FORBIDDEN, 'Forbidden Access To Resource')
    try:
        db.session.delete(current_user)
        db.session.commit()
    except SQLAlchemyError as exe:
        db.session.rollback()
        raise exe

    return jsonify(userSchema.dump(current_user)), status.HTTP_204_NO_CONTENT

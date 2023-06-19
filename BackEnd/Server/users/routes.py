from .schemas import UserCreationSchema, UserLoginSchema, UserSchema
from flask import request, abort, jsonify, Blueprint
from Server.Utils.utils import Exception_Info
from sqlalchemy.exc import SQLAlchemyError
from Server import db, bcrypt
from flask_api import status
from .models import User

users = Blueprint('users', __name__, url_prefix='/users')


# Schemas
userSchema = UserSchema()
userLoginSchema = UserLoginSchema()
userCreationSchema = UserCreationSchema()


@users.route('/')
@users.route('/all')
def all_users():
    users = User.query.all()
    return jsonify(userSchema.dump(users, many=True))


@users.route('/<int:id>')
def get_user_by_id(id):
    user = User.query.filter(User.id == id).first_or_404()
    return jsonify(userSchema.dump(user))


@users.route('/create', methods=['post'])
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


@users.route('/login', methods=['post'])
def login_user():
    data = userLoginSchema.load(request.json)
    user = User.query.filter(User.email_address ==
                             data['email_address']).one_or_none()
    if not user:
        abort(status.HTTP_404_NOT_FOUND, "Email Doesn't Exist")
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({'messege': 'Successfully Logged In'})
    abort(status.HTTP_401_UNAUTHORIZED, "Password Is Invalid")


@users.route('/<int:id>', methods=['delete'])
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

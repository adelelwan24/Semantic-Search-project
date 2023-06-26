from ..Utils.pre_processor import Format_Exception
from ..auth.auth import AuthError
from pymilvus.exceptions import MilvusException
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError
from flask import jsonify, Blueprint
from flask_api import status

errors = Blueprint('errors', __name__)


@errors.app_errorhandler(AuthError)
def handle_Authentication(AUTH_ERROR):
    return jsonify({
        'code': AUTH_ERROR.status_code,
        'message': AUTH_ERROR.error.get('description'),
        'error': AUTH_ERROR.error.get('code')
    }), AUTH_ERROR.status_code

@errors.app_errorhandler(MilvusException)
def handle_Vector_database(VDB_ERROR):
    return jsonify({
        'code': VDB_ERROR.code,
        'message': f'Vector Database Error: {Format_Exception(VDB_ERROR)}',
        'error': VDB_ERROR.message
    }), status.HTTP_500_INTERNAL_SERVER_ERROR


@errors.app_errorhandler(ValidationError)
def handle_invalid_data_format(VALIDATION_ERROR):
    return jsonify({
        'code': status.HTTP_400_BAD_REQUEST,
        'message': f"Data Validation Error: {Format_Exception(VALIDATION_ERROR)}",
        'error': VALIDATION_ERROR.messages_dict
    }), status.HTTP_400_BAD_REQUEST


@errors.app_errorhandler(SQLAlchemyError)
def sqlalchemy_error_exception(SQL_ERROR):
    return jsonify({
        'code': 422,
        'message': f"SQLAlchemy Error: {Format_Exception(SQL_ERROR)}",
        'error': str(SQL_ERROR._message()).replace('\n', '')
    }), 422


@errors.app_errorhandler(status.HTTP_404_NOT_FOUND)
def error_handler_404(error):
    return jsonify({
        'code': status.HTTP_404_NOT_FOUND,
        'message': 'Resource Not Found',
        'error': error.description
    }), status.HTTP_404_NOT_FOUND


@errors.app_errorhandler(422)
def error_handler_422(error):
    return jsonify({
        'code': 422,
        'message': error.name,
        'error': error.description
    }), 422


@errors.app_errorhandler(status.HTTP_500_INTERNAL_SERVER_ERROR)
def error_handler_500(error):
    return jsonify({
        'code': status.HTTP_500_INTERNAL_SERVER_ERROR,
        'message': error.name,
        'error': error.description
    }), status.HTTP_500_INTERNAL_SERVER_ERROR

@errors.app_errorhandler(status.HTTP_403_FORBIDDEN)
def error_handler_500(error):
    return jsonify({
        'code': status.HTTP_403_FORBIDDEN,
        'message': error.name,
        'error': error.description
    }), status.HTTP_403_FORBIDDEN

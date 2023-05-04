from flask import jsonify, Blueprint
from flask_api import status
from marshmallow import ValidationError
from sqlalchemy.exc import SQLAlchemyError
from pymilvus.exceptions import MilvusException
from ..Utils.pre_processor import Format_Exception

errors = Blueprint('errors', __name__)

@errors.app_errorhandler(MilvusException)
def handle_Vector_database(VDB_ERROR):
    return jsonify({
        'code' : VDB_ERROR.code,
        'message' :f'Vector Database Error: {Format_Exception(VDB_ERROR)}',
        'error': VDB_ERROR.message
        }), status.HTTP_500_INTERNAL_SERVER_ERROR

@errors.app_errorhandler(ValidationError)
def handle_invalid_data_format(VALIDATION_ERROR):
    return jsonify({
        'code' : status.HTTP_400_BAD_REQUEST,
        'message' : f"Data Validation Error: {Format_Exception(VALIDATION_ERROR)}",
        # 'error': VALIDATION_ERROR.__dict__['messages']
        'error': VALIDATION_ERROR.messages_dict
        }), status.HTTP_400_BAD_REQUEST

@errors.app_errorhandler(SQLAlchemyError)
def sqlalchemy_error_exception(SQL_ERROR):
    return jsonify({
        'code' : 422,
        'message' : f"SQLAlchemy Error: {Format_Exception(SQL_ERROR)}",
        # 'error': str(SQL_ERROR._sql_message())
        'error': str(SQL_ERROR._message()).replace('\n', '')
        }), 422


@errors.app_errorhandler(status.HTTP_404_NOT_FOUND)
def error_handler_404(error):
    return jsonify({
        'code' : status.HTTP_404_NOT_FOUND,
        'message' : 'Resource Not Found',
        'error' : str(error)
        }), status.HTTP_404_NOT_FOUND

@errors.app_errorhandler(422)
def error_handler_422(error):
    return jsonify({
        'code' : 422,
        'message' : 'Unprocessable Entity',
        'error': error
        }), 422

@errors.app_errorhandler(status.HTTP_500_INTERNAL_SERVER_ERROR)
def error_handler_500(error):
    return jsonify({
        'code' : status.HTTP_500_INTERNAL_SERVER_ERROR,
        'message' : 'Server Side Error',
        'error': error
        }), status.HTTP_500_INTERNAL_SERVER_ERROR
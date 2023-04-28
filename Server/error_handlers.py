from Server import app
from flask import jsonify
from flask_api import status
from marshmallow import ValidationError
from sqlalchemy.exc import SQLAlchemyError


@app.errorhandler(ValidationError)
def handle_invalid_data_format(V_Error):
    return jsonify({
        'code' : status.HTTP_400_BAD_REQUEST,
        'message' : f"Data Validation Error",
        'error': V_Error.__dict__['messages']
        }), status.HTTP_400_BAD_REQUEST

@app.errorhandler(SQLAlchemyError)
def error_exception(SQL_Error):
    return jsonify({
        'code' : 422,
        'message' : f"SQLAlchemy Error: {type(SQL_Error)}",
        'error': str(SQL_Error.__dict__['orig'])
        }), 422

@app.errorhandler(status.HTTP_404_NOT_FOUND)
def error_handler_404(error):
    return jsonify({
        'code' : status.HTTP_404_NOT_FOUND,
        'message' : 'Page not found',
        'error' : str(error)
        }), status.HTTP_404_NOT_FOUND

@app.errorhandler(422)
def error_handler_422(error):
    return jsonify({
        'code' : 422,
        'message' : 'Unprocessable Entity',
        'error': error
        }), 422

@app.errorhandler(status.HTTP_500_INTERNAL_SERVER_ERROR)
def error_handler_500(error):
    return jsonify({
        'code' : status.HTTP_500_INTERNAL_SERVER_ERROR,
        'message' : 'Server Side Error',
        'error': error
        }), status.HTTP_500_INTERNAL_SERVER_ERROR
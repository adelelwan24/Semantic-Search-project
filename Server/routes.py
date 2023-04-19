from Server import app
from Server.utils import Pre_Process, Search_VDB, Format_Results
from flask import request, Response, abort, jsonify
from flask_api import status ,exceptions



@app.route('/')
@app.route('/home')
def home():
    return 'hello world'


@app.route('/apis/videos/search', methods=['post'])
def search_video():
    query = request.form['query']
    print(query)
    # query = Pre_Process(query)
    # results = Search_VDB(query)
    return query



@app.route('/apis/papers/search', methods=['post'])
def search_papers():
    if request.is_json:
        query = request.json['query']
    else:
        query = request.form['query']
    print(query)
    # query = Pre_Process(query)
    # results = Search_VDB(query)
    return query


################################################################################
'''
Error Handeler
'''
################################################################################

@app.errorhandler(status.HTTP_404_NOT_FOUND)
def error_handler_404(error):
    return jsonify({
        'code' : status.HTTP_404_NOT_FOUND,
        'message' : 'Page not found'
        }), status.HTTP_404_NOT_FOUND

@app.errorhandler(422)
def error_handler_422(error):
    return jsonify({'code' : 422,
        'message' : 'Unprocessable Entity',
        }), 422

@app.errorhandler(status.HTTP_500_INTERNAL_SERVER_ERROR)
def error_handler_500(error):
    return jsonify({'code' : status.HTTP_500_INTERNAL_SERVER_ERROR,
        'message' : 'Server Side Error',
        }), status.HTTP_500_INTERNAL_SERVER_ERROR
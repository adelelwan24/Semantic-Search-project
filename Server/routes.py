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



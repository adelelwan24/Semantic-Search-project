from Server.search.Utils.pre_processor import Pre_Process, Format_Results
from Server.search.Utils.vdb import VectorDatabase
from Server.search.Utils.model import model
from Server import cach
from flask import request, jsonify
from flask import Blueprint

from Server.search.Utils.url_parse import url_to_id
from Server.search.Utils.youtube_transcript import get_captions
from Server.search.Utils.memoryVDB import memoryVDB
import uuid

# #### Initiate the Vector Database
vdb = VectorDatabase()
vdb.connect()
vdb.load_papers()
vdb.load_videos()


search = Blueprint('search', __name__)

vector_dbs = {}

@search.route('/videos/search')
@cach.cached(3600, query_string=True)
def search_video():
    args = request.args
    query = args.get('query', None, str)
    offset = args.get('offset', 0 , int)
    processed_query = Pre_Process(query)
    print(cach.get_dict())
    encoded = model.encode(processed_query, show_progress_bar = True)

    results = vdb.search_videos([encoded], offset=offset)
    results = Format_Results(results)

    return jsonify(results)



@search.route('/papers/search')
@cach.cached(3600, query_string=True)
def search_papers():
    args = request.args
    query = args.get('query', None, str)
    offset = args.get('offset', 0 , int)
    processed_query = Pre_Process(query)

    encoded = model.encode(processed_query, show_progress_bar = True)
    
    results = vdb.search_papers([encoded], offset=offset)
    results = Format_Results(results)
    return jsonify(results)

@search.route('/uservideo/store', methods = ["post"])
def storevideo():
    args = request.get_json()
    url = args['url']

    #get video id from url
    video_id = url_to_id(url)

    #get captions
    captions = get_captions(video_id)
    captions_texts = []
    for caption in captions:
        captions_texts.append(caption['text'])

    #get embeddings
    embeddings = model.encode(captions_texts)

    #intialize VDB and store embeddings in it
    num_entities = len(captions)
    vector_db = memoryVDB(num_entities)
    vector_db.insert(num_entities, embeddings, captions)

    #generate universally unique id 
    token  = str(uuid.uuid4())
    vector_dbs[token] = vector_db
    print(vector_dbs)
    
    return jsonify({"video_id":video_id, "token":token})

@search.route('/uservideo/search', methods = ["post"])
def user_search():
    args = request.get_json()
    query = args['query']
    token = args['token']

    #get query embedding 
    embedding = model.encode(query)

    #get the VDB
    if token == None:
        return jsonify("no video sent to server")

    vector_db = vector_dbs.get(token, None)
    if vector_db == None:
        return jsonify("vector database not found")
    
    #search in the VDB
    results = vector_db.search(embedding, 5)
    result = results[0]

    return jsonify({"results":result})

@search.route('/uservideo/delete', methods = ["DELETE"])
def remove_index():
    args = request.get_json()
    token = args['token']

    if token == None:
        return jsonify("no video sent to server")

    del vector_dbs[token]
    print(vector_dbs)

    return jsonify("success")
from typing import List
from pymilvus import connections, Collection
from dotenv import load_dotenv
import os

class VectorDatabase:
    def VDB_connect(self):
        """
        This function will create a connection with the Milvus server
        Call it once you start the server
        """
        load_dotenv()
        connections.connect(
            alias="default",
            user=os.getenv("Milvus_username"),
            password=os.getenv("Milvus_password"),
            uri=os.getenv("Milvus_uri"), #  Public endpoint obtained from Zilliz Cloud
            secure=True,
        )

    def VDB_disconnect(self):
        """
        This function will close the connection with the milvus server
        Call it before you close the server
        """
        connections.disconnect("default")

    def load_papers(self):
        """
        This function will load papers database from the storage to the memory 
        for faster search 
        Note : it is loaded to the VDB cloud memory not to server memory 
        Call it after connecting to the VDB and before searching
        """
        self.papers_collection = Collection("research_papers")     
        self.papers_collection.load()


    def load_videos(self):
        """
        This function will load videos database from the storage to the memory 
        for faster search
        Note : it is loaded to the VDB cloud memory not to server memory 
        Call it after connecting to the VDB and before searching 
        """
        self.videos_collection = Collection("youtube_videos")     
        self.videos_collection.load()

    def search_VDB_papers(self, query_embedding: List[float], top_k: int):
        """
        This function will return top_k results that is similiar to the query embedding
        """
        search_params = {
            "metric_type": "IP" #inner product
        }
        results = self.papers_collection.search(
            data = [query_embedding],
            anns_field = "embedding",
            param = search_params,
            output_fields=['title', 'abstract'],
            limit = top_k
        )
        # return is 
        # ( int : dot product value , Entity : object)
        # To get values from an Entity object
        # EntityObject.get()
        # ex: EntityObject.get("title"), EntityObject.get("abstract"), 
        return results[0][0].distance, results[0][0].entity


    def Search_VDB_videos(self, query_embedding: List[float], top_k: int):
        """
        This function will return top_k results that is similiar to the query embedding
        """
        search_params = {
            "metric_type": "IP" #inner product
        }
        results = self.videos_collection.search(
            data = [query_embedding],
            anns_field = "embedding",
            param = search_params,
            output_fields=['text', 'start_time', 'video_id'],
            limit = top_k
        )
        # return is 
        # ( dot product value , Entity object)
        # To get values from Entity object
        # EntityObject.get()
        # ex: EntityObject.get("text"), EntityObject.get("start_time"), EntityObject.get("video_id"),
        return results[0][0].distance, results[0][0].entity

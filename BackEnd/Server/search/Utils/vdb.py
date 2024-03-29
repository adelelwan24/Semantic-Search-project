from pymilvus import connections, Collection, orm
from dotenv import load_dotenv
from typing import List
import os


class VectorDatabase:
    def connect(self):
        """
        This function will create a connection with the Milvus server
        Call it once you start the server
        """
        load_dotenv()
        connections.connect("default",
                  uri=os.getenv("Milvus_uri"),
                  token=os.getenv("Milvus_token"))

    def disconnect(self):
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

    def search_papers(self, queries_embeddings: list[List[float]], top_k: int = 5, offset: int = 0) -> orm.search.SearchResult:
        """
        This function will return top_k results that is similiar to the query embedding from research_papers collection
        args:
            queries_embedding: a list of queries embeddibgs, queries embeddibgs are lists of float.
            top_k: the number of returned search results
            offset: the number of search results to skip from the top
        """
        search_params = {
            "metric_type": "IP",  # inner product
            "offset": offset
        }
        results = self.papers_collection.search(
            data=queries_embeddings,
            anns_field="embedding",
            param=search_params,
            output_fields=['title', 'abstract'],
            limit=top_k
        )
        # pymilvus.orm.search.SearchResult returns search results for all queris with same order
        # pymilvus.orm.search.SearchResult can be considered as an array of pymilvus.orm.search.Hits
        # each pymilvus.orm.search.Hits can be considered as an array of pymilvus.orm.search.Hit
        # each pymilvus.orm.search.Hit has attributes (id: int, distance: float, entity: pymilvus.client.abstract.Entity)
        # To access value in pymilvus.client.abstract.Entity, use entity.get()
        # example: entity.get('title'), entity.get('abstract').
        return results

    def search_videos(self, queries_embeddings: list[List[float]], top_k: int = 5, offset: int = 0) -> orm.search.SearchResult:
        """
        This function will return top_k results that is similiar to the query embedding from youtube_videos collection
        args:
            queries_embedding: a list of queries embeddibgs, queries embeddibgs are lists of float.
            top_k: the number of returned search results
            offset: the number of search results to skip from the top
        """
        search_params = {
            "metric_type": "IP",  # inner product
            "offset": offset
        }
        results = self.videos_collection.search(
            data=queries_embeddings,
            anns_field="embedding",
            param=search_params,
            output_fields=['text', 'start_time', 'video_id'],
            limit=top_k
        )
        # pymilvus.orm.search.SearchResult returns search results for all queris with same order
        # pymilvus.orm.search.SearchResult can be considered as an array of pymilvus.orm.search.Hits
        # each pymilvus.orm.search.Hits can be considered as an array of pymilvus.orm.search.Hit
        # each pymilvus.orm.search.Hit has attributes (id: int, distance: float, entity: pymilvus.client.abstract.Entity)
        # To access value in pymilvus.client.abstract.Entity, use entity.get()
        # example: entity.get('text'), entity.get('start_time'), entity.get('video_id').
        return results


if __name__ == '__main__':
    vdb = VectorDatabase()
    vdb.connect()
    vdb.load_papers()
    vdb.load_videos()
    res = vdb.search_videos([[.5] * 768], 5, 0)
    print(res)
    print('#' * 80)
    print(res[0][0])
    print('#' * 80)
    print(res[0][0].entity.get('text'))
    print('#' * 80)

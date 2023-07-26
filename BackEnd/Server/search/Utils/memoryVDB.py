import hnswlib
import numpy as np 

class memoryVDB:
    def __init__(self, num_elements, embedding_dim=768):
        self.index = hnswlib.Index(space = 'ip', dim = embedding_dim)
        self.index.init_index(max_elements = num_elements, ef_construction = 40, M = 8)
        self.captions = None

    def insert(self, num_elements, embeddings, captions):
        #test if num_entities == ntotal in the index
        ids = np.arange(num_elements)
        self.index.add_items(embeddings, ids)
        self.captions = captions

    def search(self, embeddings, top_k):
        if len(embeddings.shape) == 1 :
            embeddings = np.expand_dims(embeddings, 0)
        labels, distances = self.index.knn_query(embeddings, k = top_k)
        final_result = []
        for l in labels:
          one_result = []
          for index in l :
            one_result.append(self.captions[index])
          final_result.append(one_result)
        return final_result




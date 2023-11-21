# **Semantic Search Engine** to search in **_videos_** based on **_([SBERT][SBERT])_**

<div align="center">



[SBERT]: https://sbert.net/

![Main Character](https://github.com/adelelwan24/Semantic-Search-project/blob/main/client/src/assets/main_page.png?raw=true)
</div>

## Goal
is to simplify the process of searching through videos by utilizing semantic search technology, specifically the SBERT model.  
We want to make it easier for users to find the specific information they need within a video, without having to watch the entire video or listen to the whole podcast.  
By using semantic search technology, our project aims to improve the efficiency of searching through videos, particularly for educational purposes.  
This will save users time and make it easier for them to find the information they need, ultimately improving their overall experience.  
We believe that our project will be particularly beneficial for students and educators who need to find specific information within educational videos. By simplifying the search process, we aim to improve the accessibility and quality of education for students and educators alike.  <br>

**Overall**, the aim of our project is to make searching for relevant video content more efficient and effective, ultimately improving the overall learning experience for users.

## Features
-	**Powerful search functionality**:  
  Our project provides a powerful search functionality that allows users to find and access relevant information within videos.  
  By utilizing a variety of techniques and methods, we have been able to significantly improve the accuracy and relevance of search results.
-	**Flexible search options**:  
   Our search functionality offers users a range of flexible search options, including keyword-based search, phrase-based search, and advanced search filters.  
   This makes it easier for users to find the information they need within a video.
- **Transcript visualization**:  
  Our project includes a user-friendly transcript visualization feature that allows users to quickly navigate through the video transcript and find the information they need.  
  The transcript visualization feature includes timestamps, which helps users quickly identify the relevant sections of the transcript.
-	**Video previews**:  
  Our project allows users to preview video content before watching it.  
  This is particularly useful for users who are looking for specific information within a video and want to quickly identify whether the video is relevant to their needs.
-	**Responsive design**:  
  Our project is designed to be responsive and accessible across a range of devices, including desktops, laptops, tablets, and smartphones.  
  This makes it easy for users to access the information they need, wherever they are.
-	**Secure user authentication**:  
  Our project includes a secure user authentication system that ensures user data is protected and secure.  
  This is particularly important for users who are sharing sensitive or confidential information within the video platform.

## Results


### *Datasets*
We created 2 datasets for Information retrieval systems based on the <mark>domain of Artificial Intelegence</mark>.
The datasets are derived from the ArXiv dataset which contains research papers in many fields, but we filtered it to the domain of computer science (Artificial intelligence).

The datasets are uploaded to Kaggle and Hugging Face:
- Title-based. [Kaggle](https://kaggle.com/datasets/229a8ef9359c40ac1ca607b3d1d9b5580c2ba8e8334ba21b2b6f7f3c17a58dce)  | [Hugging Face](https://huggingface.co/datasets/Adel-Elwan/Artificial-intelligence-dataset-for-IR-systems/tree/main)
- synthetic query-based. [Kaggle](https://kaggle.com/datasets/600982a85d3cbaf1371998c52ce2a45bb8aca875f5ad3b38ee1ef22d1dd186d8)


### *Models*
We used the datasets to train our model on the domain of AI, to create 2 models on the 2 datasets.
The model trained on title based dataset has the best results on the datasets compared to the base model and the other model.

The model is uploaded on Hugging Face. [Model](https://huggingface.co/Adel-Elwan/msmarco-bert-base-dot-v5-fine-tuned-AI)

### *Training Results*


| Model Name        	| v2-Titles-wiht_150000_samples 	|  Base  	| v2-Query_150000_105000_105000 	|  Base  	|
|-------------------	|:-----------------------------:	|:------:	|:-----------------------------:	|:------:	|
| **Corpus Size**   	|              150k             	|  150k  	|              150k             	|  150k  	|
| **Queries Size**  	|             22.5k             	|  22.5k 	|             22.5k             	|  22.5k 	|
| **Acc@5**         	|             83.45%            	| 75.05% 	|             63.49%            	| 60.09% 	|
| **Acc@10**        	|             87.78%            	| 79.98% 	|             71.58%            	| 67.41% 	|
| **Acc@1oo**       	|             96.06%            	| 91.04% 	|             90.79%            	| 85.61% 	|
| **Precision@1**   	|             65.53%            	| 58.27% 	|             41.06%            	| 39.79% 	|
| **Precision@3**   	|             26.43%            	| 23.67% 	|             18.94%            	| 18.09% 	|
| **Precision@5**   	|             16.69%            	| 15.01% 	|             12.70%            	| 12.02% 	|
| **Precission@10** 	|             8.78%             	|  8.00% 	|             7.16%             	|  6.74% 	|
| **Recall@3**      	|             79.30%            	| 71.01% 	|             56.82%            	| 54.26% 	|
| **Recall@5**      	|             83.45%            	| 75.05% 	|             63.49%            	| 60.09% 	|
| **Recall@10**     	|             87.78%            	| 79.98% 	|             71.58%            	| 67.41% 	|
| **Recall@100**    	|             96.06%            	| 91.04% 	|             90.79%            	| 85.61% 	|
| **MRR@10**        	|             0.7327            	| 0.6557 	|             0.5062            	| 0.4854 	|
| **MRR@100**       	|             0.7364            	| 0.6604 	|             0.5143            	| 0.4929 	|
| **NDCG@10**       	|             0.768             	| 0.6905 	|             0.5564            	| 0.5307 	|
| **NDCG@100**      	|             0.7858            	| 0.7139 	|             0.597             	| 0.5688 	|


<!-- ## Future Plans -->

---
<h1 align="center" style='font-size:40px'>Thanks</h1>

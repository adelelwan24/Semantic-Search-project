# **Semantic Search Engine** for ***Video Content*** Powered by **[SBERT](https://sbert.net/)**

<div align="center">

[![YouTube Badge](https://img.shields.io/badge/-YouTube-red?style=flat\&logo=YouTube\&logoColor=white)](https://www.youtube.com/watch?v=8-sie8-GVLU)

![Main Interface](https://github.com/adelelwan24/Semantic-Search-project/blob/main/client/src/assets/main_page.png?raw=true)

</div>

---

## 🚀 Demo

Watch the demo here:
[https://github.com/adelelwan24/Semantic-Search-project/assets/72202195/cb0a3074-9812-4d23-a2ad-5cbd500e5a5d](https://github.com/adelelwan24/Semantic-Search-project/assets/72202195/cb0a3074-9812-4d23-a2ad-5cbd500e5a5d)

---

## 🎯 Project Goal

The aim of this project is to simplify the process of searching **within videos** by leveraging **semantic search** using the **SBERT** model. Rather than requiring users to watch an entire video or listen to a full podcast, we allow them to **search semantically** for the exact segment they need.

Our target users include **students**, **educators**, and **researchers**, especially those interacting with educational content. By enabling efficient and intelligent search, we aim to enhance the **learning experience**, increase **accessibility**, and save valuable time.

---

## 🔍 Key Features

* ### **Advanced Semantic Search**

  Built using SBERT, our system delivers highly relevant search results based on meaning, not just keywords.

* ### **Flexible Search Options**

  Includes support for:

  * Keyword search
  * Phrase-based queries
  * Advanced filters to refine results

* ### **Interactive Transcript Navigation**

  Users can browse transcripts with synchronized **timestamps**, enabling fast location of the desired video snippet.

* ### **Video Preview**

  Users can preview video segments before watching, making it easier to verify relevance.

* ### **Responsive UI**

  The interface is fully responsive and works seamlessly across desktop, tablet, and mobile devices.

* ### **Secure Authentication**

  Robust user authentication system ensures data privacy and protection for all users.

---

## 📊 Results

### 🗂 Datasets

We curated two specialized datasets from the ArXiv research archive, focusing on the **Artificial Intelligence** domain within computer science:

* **Title-based dataset**

  * 📁 [Kaggle](https://kaggle.com/datasets/229a8ef9359c40ac1ca607b3d1d9b5580c2ba8e8334ba21b2b6f7f3c17a58dce)
  * 🤗 [Hugging Face](https://huggingface.co/datasets/Adel-Elwan/Artificial-intelligence-dataset-for-IR-systems/tree/main)

* **Synthetic query-based dataset**

  * 📁 [Kaggle](https://kaggle.com/datasets/600982a85d3cbaf1371998c52ce2a45bb8aca875f5ad3b38ee1ef22d1dd186d8)

---

### 🤖 Models

We fine-tuned two models on our AI-specific datasets. The model trained on the **title-based dataset** achieved the best performance in semantic relevance and search accuracy.

* 🔗 [Fine-tuned Model on Hugging Face](https://huggingface.co/Adel-Elwan/msmarco-bert-base-dot-v5-fine-tuned-AI)

---

## 🧠 Conclusion

This project significantly enhances the way users interact with video content—especially in academic settings—by introducing **intelligent semantic search**. Whether you're studying, teaching, or researching, this tool makes it easier to **find what matters most**, quickly and efficiently.

---

Let me know if you’d like a version formatted for a GitHub README, a website landing page, or technical documentation!


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


<h1 align="center" style='font-size:40px'>Thanks</h1>


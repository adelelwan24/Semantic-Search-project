<h1 align="center">Server Side</h1>


<!-- <h3 align="center">
    <a href="https://huggingface.co/"><img style="float: middle; padding: 10px 10px 10px 10px;" width="60" height="55" src="./images/hf_logo.png" /></a>
</h3> -->


## Installation
### Move to BackEnd directory:

```bash
cd BackEnd
```
### Creating virtual environments:
```bash
python -m venv /path/to/new/virtual/environment
```

### Install required packages
```bash
pip install -r requirements.txt
```

<hr>

## Usage

* Using CLI

```bash
python run.py
```
* Using FLASK CLI

```bash
export FLASK_APP=run.py
flask run
```
<br>

## Advanced usage

### Database Migration

The process of migrating data from one or more source databases to one or more target databases using a database migration service:
EX: [Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/)

* Create a migration repository

````bash
flask db init
````

* Generate an initial migration:

````bash
flask db migrate -m "Initial migration."
````

* Apply the changes described by the migration script to your database:

````bash
flask db upgrade
````

* Revert the changes described by the migration script:
 
````bash
flask db downgrade
````

* Shows the list of migrations

```bash
flask db history
```
<hr>

## Run Tests

[Unittest](https://docs.python.org/3/library/unittest.html) Test Discovery:

```bash
cd BackEnd
python -m unittest discover
```

## API Reference

### Getting Started
- Base URL: At present this app can only be run locally and is not hosted as a base URL. The backend app is hosted at the default, `http://127.0.0.1:5000/`, which is set as a proxy in the frontend configuration. 
- Authentication: This version of the application does not require authentication or API keys. 

### Error Handling
Errors are returned as JSON objects in the following format:
```
{
    "code": 401,
    "error": "authorization_header_missing",
    "message": "Authorization header is expected."
}
```
The API will return three error types when requests fail:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Resource Not Found
- 422: Not Processable 
<hr>

### User Endpoints 
#### GET /users/
- Admins:
    - Returns a list of all users
    - Each user returns the id of the created user, username, email, and time of creation.
- Sample: `curl http://127.0.0.1:5000/users/`

``` [
    {
        "id": 2,
        "username": "ahmed"
        "email_address": "ahmed@gmail.com",
        "created_at": "2023-04-29T04:51:48.343506+02:00",
    },
    {
        "id": 3,
        "username": "ali"
        "email_address": "ali@gmail.com",
        "created_at": "2023-04-29T04:51:59.248270+02:00",
    }
    ]
```

#### POST /users/create
- General:
    - Creates a new user using the submitted username, email and password. Returns the id of the created user, username, email, and time of creation. 
- `curl http://127.0.0.1:5000/users/create -X POST -H "Content-Type: application/json" -d '{"username":"adel", "email_addreass":"adel@gmail.com", "password":"!@#QWE123qwe"}'`
```
{
    "id": 55,
    "username": "adel"
    "email_address": "adel@gmail.com",
    "created_at": "2023-07-09T05:39:41.897838+02:00",
}
```
#### POST /users/login
- General:
    - Login the user using the submitted email and password. Returns Json Web Token as token. 
- `curl http://127.0.0.1:5000/users/login -X POST -H "Content-Type: application/json" -d '{"email_addreass":"adel@gmail.com", "password":"!@#QWE123qwe"}'`
```
{
    "messege": "Successfully Logged In",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTUsImFkbWluIjpmYWxzZSwiZXhwIjoxNjg4ODc2NjUxfQ.cwAK1CiIav2Kn43vs5cj3D0R2CJdpST-_ljuBzQ3Vx0"
}
```
#### GET /users/info
- General:
    - Returns curret user information like the id of the user, username, email, and time of creation. 
- `curl http://127.0.0.1:5000/users/info`
```
{
    "id": 55,
    "username": "adel"
    "email_address": "adel@gmail.com",
    "created_at": "2023-07-09T05:39:41.897838+02:00",
}
```
#### GET /users/{user_id}
- Admins:
    - Returns information about user with the given IDif it exists. Returns the id of the user, username, email, and time of creation. 
- `curl http://127.0.0.1:5000/users/55`
```
{
    "id": 55,
    "username": "adel"
    "email_address": "adel@gmail.com",
    "created_at": "2023-07-09T05:39:41.897838+02:00",
}
```
#### DELETE /users/{user_id}
- Admins:
    - Deletes the user of the given ID if it exists. Returns nothing
- `curl -X DELETE http://127.0.0.1:5000/users/16`

<!-- #### PATCH /books/{book_id}
- General:
    - If provided, updates the rating of the specified book. Returns the success value and id of the modified book. 
- `curl http://127.0.0.1:5000/books/15 -X PATCH -H "Content-Type: application/json" -d '{"rating":"1"}'`
```
{
  "id": 15,
  "success": true
}
``` -->
<hr>

### Search Endpoints 
#### GET /videos/search?query={your-query}
- General:
    - Searches a predefined playlist with the value of the query parameter. 
    - Returns a list of results each result has id, video_id, text, and start_time.

- Sample: `curl http://127.0.0.1:5000/videos/search?query=what%20is%20knapkan%20problem`

``` [
    {
        "id": 7,
        "start_time": "501.89",
        "text": "It's what we old people used to call a backpack, and they used to look more like that than they look today.So the knapsack problem involves-- usually it's told in terms of a burglar who breaks into a house and wants to steal a bunch of stuff but has a knapsack that will only hold a finite amount of stuff that he or she wishes to steal.And so the burglar has to solve the optimization problem of stealing the stuff with the most value while obeying the constraint that it all has to fit in the knapsack.So we have an objective function.I'll get the most for this when I fence it.And a constraint, it has to fit in my backpack.And you can guess which of these might be the most valuable items here.So here is in words, written words what I just said orally.There's more stuff than you can carry, and you have to choose which stuff to take and which to leave behind.I should point out that there are two variants of it.There's the 0/1 knapsack problem and the continuous.The 0/1 would be illustrated by something like this.So the 0/1 knapsack problem means you either take the object or you don't.I take that whole gold bar or I take none of it.The continuous or so-called fractional knapsack problem says I can take pieces of it.",
        "video_id": "C1lhuz6pZC0"
    },
    {
        "id": 8,
        "start_time": "579.89",
        "text": "There's the 0/1 knapsack problem and the continuous.The 0/1 would be illustrated by something like this.So the 0/1 knapsack problem means you either take the object or you don't.I take that whole gold bar or I take none of it.The continuous or so-called fractional knapsack problem says I can take pieces of it.So maybe if I take in my gold bar and shaved it into gold dust, I then can say, well, the whole thing won't fit in, but I can fit in a path, part of it.The continuous knapsack problem is really boring.It's easy to solve.How do you think you would solve the continuous problem?Suppose you had over here a pile of gold and a pile of silver and a pile of raisins, and you wanted to maximize your value.Well, you'd fill up your knapsack with gold until you either ran out of gold or ran out of space.If you haven't run out of space, you'll now put silver in until you run out of space.If you still haven't run out of space, well, then you'll take as many raisins as you can fit in.But you can solve it with what's called a greedy algorithm, and we'll talk much more about this as we go forward.Where you take the best thing first as long as you can and then you move on to the next thing.",
        "video_id": "C1lhuz6pZC0"
    },
    {
        "id": 16,
        "start_time": "1112.42",
        "text": "Is there a better algorithm that I should have showed you?I shouldn't say we.Am I just being stupid?Is there a better algorithm that would have given us the answer?The sad answer to that is no for the knapsack problem.And indeed many optimization problems are inherently exponential.What that means is there is no algorithm that provides an exact solution to this problem whose worst case running time is not exponential in the number of items.It is an exponentially hard problem.There is no really good solution.But that should not make you sad because while there's no perfect solution, we're going to look at a couple of really very good solutions that will make this poor woman a happier person.So let's start with the greedy algorithm.I already talked to you about greedy algorithms.So it could hardly be simpler.We say while the knapsack is not full, put the best available item into the knapsack.When it's full, we're done.",
        "video_id": "C1lhuz6pZC0"
    },
    {
        "id": 6,
        "start_time": "436.7",
        "text": "And as we'll see, there's an asymmetry here.We handle these two things differently.We use these things all the time.I commute to work using Waze, which essentially is solving-- not very well, I believe-- an optimization problem to minimize my time from home to here.When you travel, maybe you log into various advisory programs that try and optimize things for you.They're all over the place.Today you really can't avoid using optimization algorithm as you get through life.Pretty abstract.Let's talk about a specific optimization problem called the knapsack problem.The first time I talked about the knapsack problem I neglected to show a picture of a knapsack, and I was 10 minutes into it before I realized most of the class had no idea what a knapsack was.It's what we old people used to call a backpack, and they used to look more like that than they look today.So the knapsack problem involves-- usually it's told in terms of a burglar who breaks into a house and wants to steal a bunch of stuff but has a knapsack that will only hold a finite amount of stuff that he or she wishes to steal.And so the burglar has to solve the optimization problem of stealing the stuff with the most value while obeying the constraint that it all has to fit in the knapsack.So we have an objective function.I'll get the most for this when I fence it.",
        "video_id": "C1lhuz6pZC0"
    },
    {
        "id": 70,
        "start_time": "2269.36",
        "text": "We have different things in the knapsack or different things to consider.Never do we have the same contents and the same things left to decide.So \"maybe\" was not a bad answer if that was the answer you gave to this question.But let's look at a different menu.This menu happens to have two beers in it.Now, if we look at what happens, do we see two nodes that are solving the same problem?The answer is what?Yes or no?I haven't drawn the whole tree here.Well, you'll notice the answer is yes.This node and this node are solving the same problem.Why is it?Well, in this node, we took this beer and still had this one to consider.But in this node, we took that beer but it doesn't matter which beer we took.We still have a beer in the knapsack and a burger and a slice to consider.",
        "video_id": "uK5yvoXnkSk"
    }
]
```

#### GET /papers/search?query={your-query}
- General:
    - Searches a predefined collection of research papers in the field on Artificial Inteligance with the value of the query parameter. 
    - Returns a list of results each result has id, video_id, text, and start_time.

- Sample: `curl http://127.0.0.1:5000/papers/search?query=what%20is%20dynamic%20embeddings`

```
[
    {
        "abstract": "Simultaneous embedding is concerned with simultaneously representing a series of graphs sharing some or all vertices. This forms the basis for the visualization of dynamic graphs and thus is an important field of research. Recently there has been a great deal of work investigating simultaneous embedding problems both from a theoretical and a practical point of view. We survey recent work on this topic.",
        "id": "1204.5853",
        "title": "Simultaneous Embedding of Planar Graphs"
    },
    {
        "abstract": "Contextualized embeddings such as BERT can serve as strong input representations to NLP tasks, outperforming their static embeddings counterparts such as skip-gram, CBOW and GloVe. However, such embeddings are dynamic, calculated according to a sentence-level context, which limits their use in lexical semantics tasks. We address this issue by making use of dynamic embeddings as word representations in training static embeddings, thereby leveraging their strong representation power for disambiguating context information. Results show that this method leads to improvements over traditional static embeddings on a range of lexical semantics tasks, obtaining the best reported results on seven datasets.",
        "id": "1911.02929",
        "title": "How Can BERT Help Lexical Semantics Tasks?"
    },
    {
        "abstract": "Point cloud is one of the widely used techniques for representing and storing 3D geometric data. In the past several methods have been proposed for processing point clouds. Methods such as PointNet and FoldingNet have shown promising results for tasks like 3D shape classification and segmentation. This work proposes a tree-structured autoencoder framework to generate robust embeddings of point clouds by utilizing hierarchical information using graph convolution. We perform multiple experiments to assess the quality of embeddings generated by the proposed encoder architecture and visualize the t-SNE map to highlight its ability to distinguish between different object classes. We further demonstrate the applicability of the proposed framework in applications like: 3D point cloud completion and Single image-based 3D reconstruction.",
        "id": "2110.03170",
        "title": "TreeGCN-ED: Encoding Point Cloud using a Tree-Structured Graph Network"
    },
    {
        "abstract": "Learning embedding functions, which map semantically related inputs to nearby locations in a feature space supports a variety of classification and information retrieval tasks. In this work, we propose a novel, generalizable and fast method to define a family of embedding functions that can be used as an ensemble to give improved results. Each embedding function is learned by randomly bagging the training labels into small subsets. We show experimentally that these embedding ensembles create effective embedding functions. The ensemble output defines a metric space that improves state of the art performance for image retrieval on CUB-200-2011, Cars-196, In-Shop Clothes Retrieval and VehicleID.",
        "id": "1808.04469",
        "title": "Deep Randomized Ensembles for Metric Learning"
    },
    {
        "abstract": "We present a novel graph diffusion-embedding networks (GDEN) for graph structured data. GDEN is motivated by our closed-form formulation on regularized feature diffusion on graph. GDEN integrates both regularized feature diffusion and low-dimensional embedding simultaneously in a unified network model. Moreover, based on GDEN, we can naturally deal with structured data with multiple graph structures. Experiments on semi-supervised learning tasks on several benchmark datasets demonstrate the better performance of the proposed GDEN when comparing with the traditional GCN models.",
        "id": "1810.00797",
        "title": "Graph Diffusion-Embedding Networks"
    }
]
```
<!-- <br> -->
<hr>

<h1 align="center" style='font-size:40px'>Thanks</h1>

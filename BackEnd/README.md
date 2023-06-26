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




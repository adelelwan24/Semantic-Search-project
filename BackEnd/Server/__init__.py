from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, current_app
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS


db = SQLAlchemy()
cros = CORS()
marsh = Marshmallow()
bcrypt = Bcrypt()
migrate = Migrate()

# @app.after_request
# def after_request(response):
#     response.headers.add('Access-Control-Allow-Header','Content-Type,Authorization,true')
#     response.headers.add('Access-Control_Allow-Methods' ,'GET,POST,DELETE,PATCH,OPTIONS')
#     return response

# from .models import *
# with current_app.app_context():
#     db.create_all()


def create_app(file_name='config.py') -> Flask:
    app = Flask(__name__)
    app.config.from_pyfile(file_name)

    db.init_app(app)
    cros.init_app(app)
    marsh.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)

    from Server.users.routes import users
    from Server.search.routes import search
    from Server.errors.routes import errors
    app.register_blueprint(users)
    app.register_blueprint(search)
    app.register_blueprint(errors)

    return app

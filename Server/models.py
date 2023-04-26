
from datetime import datetime
from Server import db
from sqlalchemy import Column, Integer, String

class User(db.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    email_address = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)


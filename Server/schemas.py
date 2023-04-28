from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, SQLAlchemySchema, auto_field
from marshmallow import Schema, fields, ValidationError, validates
from .models import User
import re

class UserSchema(SQLAlchemySchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True

    id = auto_field()
    username = auto_field()
    created_at = auto_field()
    email_address = auto_field()

class UserCreationSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)
    email_address = fields.Str(required=True)


    @validates('email_address')
    def validate_email_address(self, value):
        if not re.match('[^^]+@[^@]+\.[^@]+', value):
            raise ValidationError('Invalid email format')

    @validates('password')
    def validate_Password(self, value):
        if len(value) < 8:
            raise ValidationError('Password length must be longer than 8')
        if not any(c.isupper() for c in value):
            raise ValidationError('Password must contain uupper case')
        if not any(c.islower() for c in value):
            raise ValidationError('Password must contain lower case')
            
class UserLoginSchema(Schema):
    password = fields.Str(required=True)
    email_address = fields.Str(required=True)

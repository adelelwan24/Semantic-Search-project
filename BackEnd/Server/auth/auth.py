from flask import request, current_app, abort
from flask_api import status
from functools import wraps
from jose import jwt

from Server.users.models import User

## AuthError Exception
'''
AuthError Exception
A standardized way to communicate auth failure modes
'''
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


## Auth Header


def get_token_auth_header():
    """
    Obtains the Access Token from the Authorization Header
    """
    auth = request.headers.get('Authorization', None)
    if not auth:
        raise AuthError({
                'code': 'authorization_header_missing',
                'description': 'Authorization header is expected.'
        }, 401)

    parts = auth.split()

    if parts[0].lower() != 'bearer':
        raise AuthError({
            'code' : 'Invalid_header',
            'description' : 'Authorization header must start with Bearer'
        },401)
    elif len(parts) == 1:
        raise AuthError({
            'code' : 'Invalid_header',
            'description' : 'Token not found'
        }, 401)
    elif len(parts) > 2:
        raise AuthError({
            'code' : 'Invalid_header',
            'description' : 'Authorization header must be Bearer token'
        }, 401)

    token = parts[1]
    return token

def verify_decode_jwt(token):
    # unverified_header = jwt.get_unverified_header(token)
    # print(f'unverified_header: {unverified_header}')
    try:
        payload = jwt.decode(
            token,
            current_app.config.get('SECRET_KEY')
        )
        return payload

    except jwt.ExpiredSignatureError:
        raise AuthError({
            'code': 'token_expired',
            'description': 'Token expired.'
        }, 401)

    except jwt.JWTClaimsError:
        raise AuthError({
            'code': 'invalid_claims',
            'description': 'Incorrect claims. Please, check the audience and issuer.'
        }, 401)
    except Exception:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Unable to parse authentication token.'
        }, 400)



def requires_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = get_token_auth_header()
        payload = verify_decode_jwt(token)
        current_user = User.query.filter(User.id==payload['id']).first_or_404("User Not Found: Login Again")
        return f(current_user, *args, **kwargs)

    return wrapper

def requires_admin(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = get_token_auth_header()
        payload = verify_decode_jwt(token)
        if  not payload['admin']:
            abort(status.HTTP_403_FORBIDDEN, 'Forbidden Access To Resource')
        current_user = User.query.filter(User.id==payload['id']).first_or_404("User Not Found: Login Again")
        return f(current_user, *args, **kwargs)

    return wrapper
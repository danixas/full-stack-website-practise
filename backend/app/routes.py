from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS
from .models import db, User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
import jwt
import datetime
import sys
import os

bcrypt = Bcrypt()
main = Blueprint('main', __name__)

invalid_tokens = set()
invalid_tokens.add(None)
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')

@main.route('/time', methods=['GET', 'POST'])
def time():
    token = request.headers.get('Authorization')
    if token and token.startswith('Bearer '):
        token = token.split(' ')[1]
    
    if token:
        user = User.query.filter_by(jwt_token=token).first()
        if user:
            return jsonify({'lastLogin': user.last_login})
    return jsonify({'message': 'error: couldnt find the user'})


@main.route('/validate', methods=['POST'])
def validate():
    token = request.headers.get('Authorization')
    print(token, sys.stderr)
    if token and token.startswith('Bearer '):
        token = token.split(' ')[1]  # Extract the token part after 'Bearer '
        print('after splicing', sys.stderr)
        print(token, sys.stderr)

    if token in invalid_tokens or not token:
        return jsonify({'message': 'Token invalid'}), 401

    return jsonify({'message': 'Token valid'}), 200


@main.route('/logout', methods=['POST'])
def logout():
    token = request.headers.get('Authorization')
    if token and token.startswith('Bearer '):
        token = token.split(' ')[1]  # Extract the token part after 'Bearer '
        invalid_tokens.add(token)
        return jsonify({'message': 'Logout successful'})
    return jsonify({'message': 'Logout failed'})


@main.route('/login', methods=['GET', 'POST'])
def login():
    # getting user info from frontend
    data = request.json
    username = data.get('username')
    password = data.get('password')

    #checking to if user exists
    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        # if user exists creating a token to authenticate the user
        expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        token = jwt.encode({'id':username, 'exp': expiration_time}, JWT_SECRET_KEY, algorithm='HS256')

        user.last_login = datetime.datetime.utcnow()
        user.jwt_token = token
        db.session.commit()

        return jsonify({'token': token})
    
    return jsonify({'error': 'Invalid credentials'}), 401

@main.route('/register', methods=['OPTIONS'])
def handle_preflight():
    response = jsonify()
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@main.route('/register', methods=['GET', 'POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if the username already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Registration failed'}), 400
    else:
        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create a new user
        new_user = User(username=username, password=hashed_password)

        # Add the user to the database
        db.session.add(new_user)
        db.session.commit()
        user_data = {'username':username}

        return jsonify(user_data), 200



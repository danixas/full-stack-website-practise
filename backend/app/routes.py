from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from .models import db, User
from flask_bcrypt import Bcrypt
import jwt
import datetime

bcrypt = Bcrypt()
main = Blueprint('main', __name__)

invalid_tokens = set()

@main.route('/validate', methods=['POST'])
def validate():
    token = request.headers.get('Authorization')

    if token and token.startswith('Bearer '):
        token = token.split(' ')[1]  # Extract the token part after 'Bearer '

        if token in invalid_tokens:
            return jsonify({'message': 'Token invalid'}), 401

        return jsonify({'message': 'Token valid'}), 200

    return jsonify({'message': 'No valid token provided'}), 401

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
        token = jwt.encode({'id':username, 'exp': expiration_time}, 'secret', algorithm='HS256')

        return jsonify({'token': token})
    
    return jsonify({'error': 'Invalid credentials'}), 401

# Add a route to handle preflight requests
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

@main.route('/generate_data', methods=['GET'])
def generate_data():
    user1 = User(username='admin', password=bcrypt.generate_password_hash('admin').decode('utf-8'))
    user2 = User(username='guest', password=bcrypt.generate_password_hash('guest').decode('utf-8'))
    # Add users to the database
    db.session.add(user1)
    db.session.add(user2)

    # Commit changes to the database
    db.session.commit()

    return 'data generated'


from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from .models import db, User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
main = Blueprint('main', __name__)

@main.route('/login', methods=['GET', 'POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        user_data = {'username':username}
        return jsonify(user_data), 200
    
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
        print('Username already exists. Please choose a different one.')
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


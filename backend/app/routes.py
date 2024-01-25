from flask import Blueprint, render_template, request, redirect, url_for, flash
from .models import db, User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
main = Blueprint('main', __name__)

@main.route('/login', methods=['GET', 'POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return render_template('index.html')
    else:
        return render_template('login.html')
    
@main.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Get form data
        username = request.form.get('username')
        password = request.form.get('password')

        # Check if the username already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash('Username already exists. Please choose a different one.', 'error')
            return redirect(url_for('main.register'))

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create a new user
        new_user = User(username=username, password=hashed_password)

        # Add the user to the database
        db.session.add(new_user)
        db.session.commit()

        flash('Registration successful! You can now log in.', 'success')
        return redirect(url_for('main.login'))

    return render_template('register.html')

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


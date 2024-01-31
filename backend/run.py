from app import create_app
from flask_cors import CORS 

app = create_app()
app.config['SECRET_KEY'] = 'secret'
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})

if __name__ == '__main__':
    app.run(debug=True)

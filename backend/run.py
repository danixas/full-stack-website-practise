from app import create_app
from flask_cors import CORS 
from flask_jwt_extended import JWTManager

app = create_app()
CORS(app, supports_credentials=True)

jwt = JWTManager(app)

if __name__ == '__main__':
    app.run(debug=True)

# MY PROJECT TO PRACTISE REACT AND FLASK

The project includes a simple User Registration and Login System with a backend built using Flask and a frontend powered by React. All passwords are hashed with Bcrypt for security.
### How To Run:
**Clone the repository to your local machine**
## Secret Key
**Create a .env folder in the root of your project to set up your own secret keys**
```
SECRET_KEY=[your-secret-key-goes-here]
JWT_SECRET_KEY=[your-JWT-secret-key-goes-here]
```

## Backend Setup

1. **Navigate to the Backend Directory:**
   ```bash
   cd backend

2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Backend:**
   ```bash
   python run.py
   ```

The backend should now be running at `http://localhost:5000`.

## Frontend Setup

1. **Navigate to the Frontend Directory:**
   ```bash
   cd frontend/react-app
   ```

2. **Install Node Modules:**
   ```bash
   npm install
   ```

3. **Run the Frontend:**
   ```bash
   npm start
   ```

The frontend development server should now be running at `http://localhost:3000`.

## Access the Application

Open your web browser and navigate to `http://localhost:3000` to access the application. Register a new account, log in, and explore the user homepage with last login details and current session time.
```

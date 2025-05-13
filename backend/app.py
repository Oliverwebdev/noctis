# --- app.py (bereinigte Version) ---------------------------------
import os
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

from models  import db, bcrypt
from auth    import auth_blueprint
from discord import discord_blueprint        # enthält bereits die Route!

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["JWT_SECRET_KEY"]         = os.getenv("JWT_SECRET_KEY")
app.config["SECRET_KEY"]             = os.getenv("SECRET_KEY")

db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)
jwt     = JWTManager(app)

# ⚙️  Blueprints – **nur** registrieren
app.register_blueprint(auth_blueprint)
app.register_blueprint(discord_blueprint)

@app.get("/")
def home():
    return jsonify(message="Backend is running"), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(port=5000, debug=True)

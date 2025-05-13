# models.py
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt    import Bcrypt
from datetime        import datetime

db     = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = "users"

    id           = db.Column(db.Integer, primary_key=True)
    username     = db.Column(db.String(50),  unique=True, nullable=False)
    email        = db.Column(db.String(120), unique=True, nullable=False)
    password_hash= db.Column(db.String(128), nullable=False)
    discord_id   = db.Column(db.String(50),  unique=True)
    verified     = db.Column(db.Boolean,     default=False)
    v_token      = db.Column(db.String(64),  nullable=True)      # verification
    created_at   = db.Column(db.DateTime,    default=datetime.utcnow)

    # ---------- helpers ----------
    def set_password(self, password: str):
        self.password_hash = bcrypt.generate_password_hash(password).decode()

    def check_password(self, password: str) -> bool:
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User {self.username} verified={self.verified}>"

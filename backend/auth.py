# auth.py
import os, secrets, smtplib, ssl
from email.message import EmailMessage
from flask         import Blueprint, request, jsonify, url_for
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)
from models import db, User

auth_blueprint = Blueprint("auth", __name__, url_prefix="/api")

# ---------- helpers ----------
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

def _send_verification_mail(user: User):
    token = secrets.token_urlsafe(32)
    user.v_token = token
    db.session.commit()

    verify_link = f"{FRONTEND_URL}/verify/{token}"      # React‑Route
    msg = EmailMessage()
    msg["Subject"] = "Bitte bestätige deine Noctis‑Registrierung"
    msg["From"]    = os.getenv("MAIL_FROM")
    msg["To"]      = user.email
    msg.set_content(
        f"Hi {user.username},\n\n"
        f"klicke auf folgenden Link, um dein Konto zu bestätigen:\n{verify_link}\n\n"
        "Falls du dich nicht registriert hast, ignoriere diese Mail."
    )

    # SMTP‑Versand (hier minimal, produktiv STARTTLS/SSL & Credentials)
    ctx = ssl.create_default_context()
    with smtplib.SMTP_SSL(os.getenv("MAIL_HOST"), 465, context=ctx) as smtp:
        smtp.login(os.getenv("MAIL_USER"), os.getenv("MAIL_PASS"))
        smtp.send_message(msg)

# ---------- routes ----------
@auth_blueprint.post("/register")
def register():
    data = request.json or {}
    username = data.get("username")
    email    = data.get("email")
    pw       = data.get("password")

    if not all((username, email, pw)):
        return jsonify(error="All fields required"), 400
    if User.query.filter_by(email=email).first():
        return jsonify(error="Email already registered"), 409

    user = User(username=username, email=email)
    user.set_password(pw)
    db.session.add(user); db.session.commit()
    _send_verification_mail(user)

    return jsonify(msg="User created, verification mail sent"), 201

@auth_blueprint.post("/login")
def login():
    data = request.json or {}
    user = User.query.filter_by(email=data.get("email")).first()
    if not user or not user.check_password(data.get("password")):
        return jsonify(error="Invalid credentials"), 401
    if not user.verified:
        return jsonify(error="Email not verified"), 401

    token = create_access_token(identity=user.id)
    return jsonify(token=token, username=user.username), 200

@auth_blueprint.get("/verify/<token>")
def verify(token):
    user = User.query.filter_by(v_token=token).first()
    if not user:
        return jsonify(error="Invalid or expired link"), 404
    user.verified, user.v_token = True, None
    db.session.commit()
    return jsonify(msg="Account verified"), 200      # FE zeigt Confirmation‑Seite

@auth_blueprint.delete("/delete")
@jwt_required()
def delete_account():
    uid = get_jwt_identity()
    user = User.query.get(uid)
    if not user:
        return jsonify(error="User not found"), 404
    db.session.delete(user); db.session.commit()
    return jsonify(msg="Account deleted"), 200

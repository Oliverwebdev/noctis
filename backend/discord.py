# discord.py
import os
import requests
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps
from models import User

discord_blueprint = Blueprint("discord", __name__)

DISCORD_BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN")
GUILD_ID = os.getenv("GUILD_ID")

def verified_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        uid = get_jwt_identity()
        user = User.query.get(uid)
        if not user or not user.verified:
            return jsonify(error="Verification required"), 403
        return fn(*args, **kwargs)
    return wrapper

@discord_blueprint.route("/discord/channels", methods=["GET"])
@jwt_required()
def get_channels():
    headers = {
        "Authorization": f"Bot {DISCORD_BOT_TOKEN}"
    }
    url = f"https://discord.com/api/v10/guilds/{GUILD_ID}/channels"
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch channels"}), response.status_code

    channels = response.json()
    return jsonify(channels), 200

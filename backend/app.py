from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from flask_limiter import Limiter  # type: ignore
from flask_limiter.util import get_remote_address  # type: ignore
import os

from api.routes.fixtures import fixtures_bp
from api.routes.live import live_bp
from api.routes.standings import standings_bp
from api.routes.teams import teams_bp
from api.routes.players import players_bp
from api.routes.top_scorers import top_scorers_bp

load_dotenv()

app = Flask(__name__)

app.config["JSON_SORT_KEYS"] = False

# -------------------------
# API Key
# -------------------------

API_KEY = os.getenv("API_KEY")

print(f"API_KEY cargada: {'Sí' if API_KEY else 'No'}")


@app.before_request
def verify_api_key():

    # Permitir preflight CORS
    if request.method == "OPTIONS":
        return

    # Endpoints públicos
    public_routes = ["/", "/health"]

    if request.path in public_routes:
        return

    key = request.headers.get("X-API-KEY")

    if key != API_KEY:
        return jsonify({
            "success": False,
            "message": "Invalid API key"
        }), 401


# -------------------------
# Rate Limiter
# -------------------------

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["20 per minute"]
)

limiter.init_app(app)

# -------------------------
# CORS
# -------------------------

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [
                "*"
            ]
        }
    }
)

# -------------------------
# Health Check
# -------------------------

@app.route("/")
def home():
    return jsonify({
        "name": "WC26 Tracker API",
        "status": "online",
        "version": "1.0.0"
    })


@app.route("/health")
def health():
    return jsonify({
        "success": True,
        "message": "API funcionando correctamente"
    })


# -------------------------
# Registrar Blueprints
# -------------------------

app.register_blueprint(fixtures_bp, url_prefix="/api")
app.register_blueprint(live_bp, url_prefix="/api")
app.register_blueprint(standings_bp, url_prefix="/api")
app.register_blueprint(teams_bp, url_prefix="/api")
app.register_blueprint(players_bp, url_prefix="/api")
app.register_blueprint(top_scorers_bp, url_prefix="/api")


# -------------------------
# Manejo de errores
# -------------------------

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "message": "Endpoint no encontrado"
    }), 404


@app.errorhandler(500)
def server_error(error):
    return jsonify({
        "success": False,
        "message": "Error interno del servidor"
    }), 500


# -------------------------
# Main
# -------------------------

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.getenv("PORT", 5000)),
        debug=True
    )
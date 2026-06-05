from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Blueprints
from api.routes.fixtures import fixtures_bp
from api.routes.live import live_bp
from api.routes.standings import standings_bp
from api.routes.teams import teams_bp

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)

# Configuración
app.config["JSON_SORT_KEYS"] = False

# CORS
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
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
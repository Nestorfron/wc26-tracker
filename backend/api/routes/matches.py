# routes/matches.py

from flask import Blueprint, jsonify

from api.services.api_football import get_fixtures
from api.cache.cache import get_cache, set_cache

matches_bp = Blueprint("matches", __name__)

@matches_bp.route("/fixtures")
def fixtures():

    cached = get_cache("fixtures")

    if cached:
        print("CACHE MATCHES")
        return jsonify(cached)

    data = get_fixtures()

    print("DATA MATCHES")

    set_cache(
        "fixtures",
        data,
        minutes=30
    )

    return jsonify({
        "matches": data["response"]
    })
import json
from flask import Blueprint, jsonify
from api.cache.cache import get_cache, set_cache
from api.services.api_football import get_top_scorers

top_scorers_bp = Blueprint(
    "top_scorers",
    __name__
)

@top_scorers_bp.route("/players/topscorers")
def top_scorers():
    cached = get_cache("top_scorers")
    if cached:
        print("CACHE TOP SCORERS")
        return jsonify(cached)

    data = get_top_scorers()

    print("DATA TOP SCORERS")

    set_cache(
        "top_scorers",
        data,
        minutes=1440
    )

    return jsonify({
        "top_scorers": data["response"]
    })
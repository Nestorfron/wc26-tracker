from flask import Blueprint, jsonify

from api.cache.cache import get_cache, set_cache
from api.services.api_football import get_standings

standings_bp = Blueprint(
    "standings",
    __name__
)

@standings_bp.route("/standings")
def standings():

    cached = get_cache("standings")

    if cached:
        return jsonify(cached)

    data = get_standings()

    set_cache(
        "standings",
        data,
        minutes=30
    )

    return jsonify(data)
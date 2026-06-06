from flask import Blueprint, jsonify

from api.cache.cache import get_cache, set_cache
from api.services.api_football import get_live_matches

live_bp = Blueprint(
    "live",
    __name__
)

@live_bp.route("/live")
def live():

    cached = get_cache("live")

    if cached:
        return jsonify(cached)

    data = get_live_matches()

    set_cache(
        "live",
        data,
        minutes=1
    )

    return jsonify({
        "live": data["response"]
    })
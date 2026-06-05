from flask import Blueprint, jsonify

from api.cache.cache import get_cache, set_cache
from api.services.api_football import get_teams

teams_bp = Blueprint(
    "teams",
    __name__
)

@teams_bp.route("/teams")
def teams():

    cached = get_cache("teams")

    if cached:
        return jsonify(cached)

    data = get_teams()

    set_cache(
        "teams",
        data,
        minutes=1440
    )

    return jsonify(data)
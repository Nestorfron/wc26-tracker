from flask import Blueprint, jsonify

from api.cache.cache import get_cache, set_cache
from api.services.api_football import get_fixtures

fixtures_bp = Blueprint(
    "fixtures",
    __name__
)

@fixtures_bp.route("/fixtures")
def fixtures():

    cached = get_cache("fixtures")

    if cached:
        return jsonify(cached)

    data = get_fixtures()

    set_cache(
        "fixtures",
        data,
        minutes=60
    )

    return jsonify(data)
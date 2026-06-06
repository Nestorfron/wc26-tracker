from flask import Blueprint, jsonify
from api.cache.cache import get_cache, set_cache
from api.services.api_football import get_players

players_bp = Blueprint("players", __name__)

@players_bp.route("/players/squads/<int:team_id>")
def get_squad(team_id):

    cache_key = f"players_squad_{team_id}"
    cached = get_cache(cache_key)

    if cached:
        print("CACHE PLAYERS")
        return jsonify(cached)

    data = get_players(team_id)

    print("DATA PLAYERS")

    raw = data.get("response", [])

    if not raw:
        result = {
            "team": None,
            "players": []
        }
    else:
        squad = raw[0]
        result = {
            "team": squad.get("team"),
            "players": squad.get("players", [])
        }

    set_cache(cache_key, result, minutes=30)

    return jsonify(result)
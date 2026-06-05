import requests # type: ignore

from config import Config

BASE_URL = "https://v3.football.api-sports.io"

HEADERS = {
    "x-rapidapi-key": Config.API_FOOTBALL_KEY,
    "x-rapidapi-host": "v3.football.api-sports.io"
}


def request_api(endpoint, params=None):

    response = requests.get(
        f"{BASE_URL}/{endpoint}",
        headers=HEADERS,
        params=params
    )

    response.raise_for_status()

    return response.json()


def get_fixtures():

    return request_api(
        "fixtures",
        {
            "league": 1,
            "season": 2026
        }
    )

def get_live_matches():

    return request_api(
        "fixtures",
        {
            "live": "all"
        }
    )


def get_standings():

    return request_api(
        "standings",
        {
            "league": 1,
            "season": 2026
        }
    )

def get_teams():

    return request_api(
        "teams",
        {
            "league": 1,
            "season": 2026
        }
    )
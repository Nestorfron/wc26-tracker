from datetime import datetime, timedelta

cache = {}

def get_cache(key):

    if key not in cache:
        return None

    item = cache[key]

    if item["expires"] < datetime.now():
        del cache[key]
        return None

    return item["data"]


def set_cache(key, data, minutes=10):

    cache[key] = {
        "data": data,
        "expires": datetime.now() + timedelta(minutes=minutes)
    }
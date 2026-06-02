from flask import Blueprint, request, jsonify  # type: ignore
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, create_refresh_token  # type: ignore
from werkzeug.security import generate_password_hash, check_password_hash  # type: ignore
from api.models import db, User, Team, Match, Standing, Favorite, MatchEvent

from datetime import date 
from .utils.email_utils import send_email  

api = Blueprint("api", __name__)


@api.route("/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello World!"})


#------------------------------------------------------------------------------
# USERS
#------------------------------------------------------------------------------

@api.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])


@api.route("/users", methods=["POST"])
@jwt_required()
def create_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    active = data.get("active")
    
    if not username or not password or not email:
        return jsonify({"error": "Missing required fields"}), 400
    
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({"error": "Username already exists"}), 400
    
    user = User(
        username=username, 
        password_hash=generate_password_hash(password), 
        email=email, 
        active=active if active is not None else True
    )
    db.session.add(user)
    db.session.commit()
    
    return jsonify(user.serialize()), 201


@api.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404  
    
    return jsonify(user.serialize())


@api.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"message": "User deleted"}), 204


#------------------------------------------------------------------------------
# TEAMS
#------------------------------------------------------------------------------

@api.route("/groups/<group_name>", methods=["GET"])
def teams_by_group(group_name):
    teams = Team.query.filter_by(group_name=group_name.upper()).all()
    return jsonify([team.serialize() for team in teams])


@api.route("/teams", methods=["GET"])
def get_teams():
    teams = Team.query.all()
    return jsonify([team.serialize() for team in teams])


@api.route("/teams", methods=["POST"])
@jwt_required()
def create_team():
    data = request.get_json()
    name = data.get("name")
    code = data.get("code")
    flag_url = data.get("flag_url")
    group_name = data.get("group_name")
    
    if not name or not code or not flag_url or not group_name:
        return jsonify({"error": "Missing required fields"}), 400
    
    team = Team.query.filter_by(name=name).first()
    if team:
        return jsonify({"error": "Team name already exists"}), 400
    
    team = Team(name=name, code=code, flag_url=flag_url, group_name=group_name)
    db.session.add(team)
    db.session.commit()
    
    return jsonify(team.serialize()), 201


@api.route("/teams/<int:team_id>", methods=["GET"])
def get_team(team_id):
    team = Team.query.get(team_id)
    if not team:
        return jsonify({"error": "Team not found"}), 404  
    
    return jsonify(team.serialize())


@api.route("/teams/<int:team_id>", methods=["DELETE"])
@jwt_required()
def delete_team(team_id):
    team = Team.query.get(team_id)
    if not team:
        return jsonify({"error": "Team not found"}), 404
    
    db.session.delete(team)
    db.session.commit()
    
    return jsonify({"message": "Team deleted"}), 204


#------------------------------------------------------------------------------
# MATCHES
#------------------------------------------------------------------------------

@api.route("/matches", methods=["GET"])
def get_matches():
    matches = Match.query.all()
    return jsonify([match.serialize() for match in matches])


@api.route("/matches", methods=["POST"])
@jwt_required()
def create_match():
    data = request.get_json()
    home_team_id = data.get("home_team_id")
    away_team_id = data.get("away_team_id")
    home_score = data.get("home_score")
    away_score = data.get("away_score")
    status = data.get("status")
    match_date = data.get("match_date")
    stadium = data.get("stadium")
    city = data.get("city")
    stage = data.get("stage")
    
    if not home_team_id or not away_team_id or home_score is None or away_score is None or not status or not match_date or not stadium or not city or not stage:
        return jsonify({"error": "Missing required fields"}), 400
    
    match = Match.query.filter_by(home_team_id=home_team_id, away_team_id=away_team_id).first()
    if match:
        return jsonify({"error": "Match already exists"}), 400  
    
    match = Match(
        home_team_id=home_team_id, away_team_id=away_team_id, home_score=home_score, 
        away_score=away_score, status=status, match_date=match_date, 
        stadium=stadium, city=city, stage=stage
    )
    db.session.add(match)
    db.session.commit()
    
    return jsonify(match.serialize()), 201


@api.route("/matches/<int:match_id>", methods=["GET"])
def get_match(match_id):
    match = Match.query.get(match_id)
    if not match:
        return jsonify({"error": "Match not found"}), 404  
    
    return jsonify(match.serialize())


@api.route("/matches/<int:match_id>", methods=["DELETE"])
@jwt_required()
def delete_match(match_id):
    match = Match.query.get(match_id)
    if not match:
        return jsonify({"error": "Match not found"}), 404
    
    db.session.delete(match)
    db.session.commit()
    
    return jsonify({"message": "Match deleted"}), 204


@api.route("/matches/today", methods=["GET"])
def matches_today():
    today = date.today()
    matches = Match.query.filter(db.func.date(Match.match_date) == today).all()
    return jsonify([match.serialize() for match in matches])


#------------------------------------------------------------------------------
# STANDINGS
#------------------------------------------------------------------------------

@api.route("/standings", methods=["GET"])
def get_all_standings():
    standings = Standing.query.all()
    return jsonify([standing.serialize() for standing in standings])


@api.route("/standings", methods=["POST"])
@jwt_required()
def create_standings():
    data = request.get_json()
    team_id = data.get("team_id")
    group_name = data.get("group_name")
    played = data.get("played")
    won = data.get("won")
    draw = data.get("draw")
    lost = data.get("lost")
    goals_for = data.get("goals_for")
    goals_against = data.get("goals_against")
    points = data.get("points")
    
    if not team_id or not group_name or played is None or won is None or draw is None or lost is None or goals_for is None or goals_against is None or points is None:
        return jsonify({"error": "Missing required fields"}), 400
    
    standings = Standing.query.filter_by(team_id=team_id).first()
    if standings:
        return jsonify({"error": "Standings already exists"}), 400  
    
    standings = Standing(
        team_id=team_id, group_name=group_name, played=played, won=won, 
        draw=draw, lost=lost, goals_for=goals_for, goals_against=goals_against, points=points
    )
    db.session.add(standings)
    db.session.commit()
    
    return jsonify(standings.serialize()), 201


@api.route("/standings/<int:standings_id>", methods=["GET"])
def get_standing(standings_id):
    standings = Standing.query.get(standings_id)
    if not standings:
        return jsonify({"error": "Standings not found"}), 404  
    
    return jsonify(standings.serialize())


@api.route("/standings/<int:standings_id>", methods=["DELETE"])
@jwt_required()
def delete_standings(standings_id):
    standings = Standing.query.get(standings_id)
    if not standings:
        return jsonify({"error": "Standings not found"}), 404
    
    db.session.delete(standings)
    db.session.commit()
    
    return jsonify({"message": "Standings deleted"}), 204


#------------------------------------------------------------------------------
# FAVORITES
#------------------------------------------------------------------------------

@api.route("/favorites", methods=["GET"])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    favorites = Favorite.query.filter_by(user_id=int(user_id)).all()
    return jsonify([favorite.serialize() for favorite in favorites])


@api.route("/favorites", methods=["POST"])
@jwt_required()
def create_favorite():
    data = request.get_json()
    user_id = get_jwt_identity()
    team_id = data.get("team_id")
    
    if not team_id:
        return jsonify({"error": "Missing required fields"}), 400
    
    favorite = Favorite.query.filter_by(user_id=int(user_id), team_id=team_id).first()
    if favorite:
        return jsonify({"error": "Favorite already exists"}), 400  
    
    favorite = Favorite(user_id=int(user_id), team_id=team_id)
    db.session.add(favorite)
    db.session.commit()
    
    return jsonify(favorite.serialize()), 201


@api.route("/favorites/<int:favorite_id>", methods=["GET"])
def get_favorite(favorite_id):
    favorite = Favorite.query.get(favorite_id)
    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404  
    
    return jsonify(favorite.serialize())


@api.route("/favorites/<int:favorite_id>", methods=["DELETE"])
@jwt_required()
def delete_favorite(favorite_id):
    favorite = Favorite.query.get(favorite_id)
    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404
    
    db.session.delete(favorite)
    db.session.commit()
    
    return jsonify({"message": "Favorite deleted"}), 204


#------------------------------------------------------------------------------
# AUTH
#------------------------------------------------------------------------------

@api.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    
    if not username or not password:
        return jsonify({"error": "Missing required fields"}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    if not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401
    
    # Es una buena práctica pasar la identidad como string en flask_jwt_extended
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    
    return jsonify({"access_token": access_token, "refresh_token": refresh_token}), 200


@api.route("/auth/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)


@api.route("/auth/logout", methods=["POST"])
@jwt_required()
def logout():
    # Nota: Para un logout real y seguro con JWT, deberías implementar una lista negra (blacklist/blocklist) de tokens pasados.
    return jsonify(message="Logout successful"), 200


@api.route("/users/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.serialize())
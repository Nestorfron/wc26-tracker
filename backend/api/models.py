from flask_sqlalchemy import SQLAlchemy
from config import Config

db = SQLAlchemy(engine_options=Config.SQLALCHEMY_ENGINE_OPTIONS)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(
        db.String(64),
        unique=True,
        index=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    active = db.Column(
        db.Boolean,
        default=True
    )

    created_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp()
    )

    updated_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp()
    )

    favorites = db.relationship(
        "Favorite",
        backref="user",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "active": self.active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class Team(db.Model):
    __tablename__ = "teams"

    id = db.Column(db.Integer, primary_key=True)

    api_id = db.Column(
        db.Integer,
        unique=True,
        index=True
    )

    name = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    code = db.Column(
        db.String(10),
        unique=True,
        nullable=False
    )

    flag_url = db.Column(db.String(500))

    group_name = db.Column(
        db.String(10),
        index=True
    )

    created_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp()
    )

    updated_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp()
    )

    def serialize(self):
        return {
            "id": self.id,
            "api_id": self.api_id,
            "name": self.name,
            "code": self.code,
            "flag_url": self.flag_url,
            "group_name": self.group_name,
        }


class Match(db.Model):
    __tablename__ = "matches"

    id = db.Column(db.Integer, primary_key=True)

    api_id = db.Column(
        db.Integer,
        unique=True,
        index=True
    )

    home_team_id = db.Column(
        db.Integer,
        db.ForeignKey("teams.id"),
        nullable=False
    )

    away_team_id = db.Column(
        db.Integer,
        db.ForeignKey("teams.id"),
        nullable=False
    )

    home_score = db.Column(
        db.Integer,
        default=0
    )

    away_score = db.Column(
        db.Integer,
        default=0
    )

    status = db.Column(
        db.String(20),
        default="NS"
    )

    match_date = db.Column(
        db.DateTime,
        nullable=False
    )

    stadium = db.Column(
        db.String(128)
    )

    city = db.Column(
        db.String(128)
    )

    stage = db.Column(
        db.String(50)
    )

    created_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp()
    )

    updated_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp()
    )

    home_team = db.relationship(
        "Team",
        foreign_keys=[home_team_id]
    )

    away_team = db.relationship(
        "Team",
        foreign_keys=[away_team_id]
    )

    events = db.relationship(
        "MatchEvent",
        backref="match",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def serialize(self):
        return {
            "id": self.id,
            "api_id": self.api_id,
            "home_team": self.home_team.serialize() if self.home_team else None,
            "away_team": self.away_team.serialize() if self.away_team else None,
            "home_score": self.home_score,
            "away_score": self.away_score,
            "status": self.status,
            "match_date": self.match_date.isoformat() if self.match_date else None,
            "stadium": self.stadium,
            "city": self.city,
            "stage": self.stage,
        }


class Standing(db.Model):
    __tablename__ = "standings"

    id = db.Column(db.Integer, primary_key=True)

    team_id = db.Column(
        db.Integer,
        db.ForeignKey("teams.id"),
        nullable=False
    )

    group_name = db.Column(
        db.String(10),
        index=True
    )

    played = db.Column(
        db.Integer,
        default=0
    )

    won = db.Column(
        db.Integer,
        default=0
    )

    draw = db.Column(
        db.Integer,
        default=0
    )

    lost = db.Column(
        db.Integer,
        default=0
    )

    goals_for = db.Column(
        db.Integer,
        default=0
    )

    goals_against = db.Column(
        db.Integer,
        default=0
    )

    points = db.Column(
        db.Integer,
        default=0
    )

    updated_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp()
    )

    team = db.relationship("Team")

    def serialize(self):
        return {
            "id": self.id,
            "team": self.team.serialize() if self.team else None,
            "group_name": self.group_name,
            "played": self.played,
            "won": self.won,
            "draw": self.draw,
            "lost": self.lost,
            "goals_for": self.goals_for,
            "goals_against": self.goals_against,
            "points": self.points,
        }


class Player(db.Model):
    __tablename__ = "players"

    id = db.Column(db.Integer, primary_key=True)

    api_id = db.Column(
        db.Integer,
        unique=True,
        index=True
    )

    team_id = db.Column(
        db.Integer,
        db.ForeignKey("teams.id"),
        nullable=False
    )

    name = db.Column(
        db.String(120),
        nullable=False
    )

    position = db.Column(
        db.String(50)
    )

    photo_url = db.Column(
        db.String(500)
    )

    team = db.relationship("Team")

    def serialize(self):
        return {
            "id": self.id,
            "api_id": self.api_id,
            "name": self.name,
            "position": self.position,
            "photo_url": self.photo_url,
            "team": self.team.serialize() if self.team else None,
        }


class MatchEvent(db.Model):
    __tablename__ = "match_events"

    id = db.Column(db.Integer, primary_key=True)

    match_id = db.Column(
        db.Integer,
        db.ForeignKey("matches.id"),
        nullable=False
    )

    team_id = db.Column(
        db.Integer,
        db.ForeignKey("teams.id")
    )

    minute = db.Column(db.Integer)

    event_type = db.Column(
        db.String(30)
    )

    player_name = db.Column(
        db.String(120)
    )

    description = db.Column(
        db.String(255)
    )

    team = db.relationship("Team")

    def serialize(self):
        return {
            "id": self.id,
            "minute": self.minute,
            "event_type": self.event_type,
            "player_name": self.player_name,
            "description": self.description,
            "team": self.team.serialize() if self.team else None,
        }


class Favorite(db.Model):
    __tablename__ = "favorites"

    __table_args__ = (
        db.UniqueConstraint(
            "user_id",
            "team_id",
            name="unique_favorite"
        ),
    )

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    team_id = db.Column(
        db.Integer,
        db.ForeignKey("teams.id"),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp()
    )

    updated_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp()
    )

    team = db.relationship("Team")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "team": self.team.serialize() if self.team else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
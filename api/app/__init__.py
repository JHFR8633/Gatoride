from flask import Flask, jsonify
from .models import db
from .routes import configure_routes
from .models import create_dummy_cars
from flask_cors import CORS


def create_app():
    app = Flask(__name__) 
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../persons.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    with app.app_context():
        db.drop_all() # wipes the database after every start, if we don't want this remove this line
        db.create_all()
        create_dummy_cars() # inserts car data after every start
        configure_routes(app)
    return_status(True)
    return app

def return_status(status):
    if status:
        return "successful"
    else:
        return "unsuccessful"
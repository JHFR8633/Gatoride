from flask import Flask
from .models.models import db
from .routing.reservation_routes import configure_reservation_routes
from .routing.user_routes import configure_user_routes
from .routing.car_routes import configure_car_routes
from .models.user_methods import create_admin_account, create_employee_accounts
from .models.car_methods import testing_data_cars
from flask_cors import CORS #type: ignore
from flask_jwt_extended import JWTManager #type: ignore


def create_app():
    app = Flask(__name__) 
    configure_parameters( app )
    
    with app.app_context():
        configure_database( app )
        configure_routes( app )

    return app

def configure_parameters( app ):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../persons.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret'
    jwt = JWTManager(app)
    CORS(app)

def configure_database( app ):
    db.init_app( app )
    db.drop_all() # wipes the database after every start, if we don't want this remove this line
    db.create_all()
    testing_data_cars()
    create_admin_account()
    create_employee_accounts( 25 )


def configure_routes( app ):
    configure_reservation_routes( app )
    configure_user_routes( app )
    configure_car_routes( app )
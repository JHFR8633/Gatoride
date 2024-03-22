from flask import jsonify, request
from flask_sqlalchemy import SQLAlchemy
from .models import User, Car
from .models import add_data, gethashed_password_username
from flask_bcrypt import generate_password_hash, check_password_hash

def configure_routes(app):
    @app.route('/members')
    def run():
        members = [user.name for user in User.query.all()]
        return jsonify({"members": members})
    
    @app.route('/addUser', methods=['POST'])
    def add_user():
        new_user=request.get_json()
        #encrypt password and username. Leave name becuase bcrypt cannot reverse hash
        new_user['username']=generate_password_hash(new_user['username'])
        new_user['password']=generate_password_hash(new_user['password'])
        add_data(new_user)
        return jsonify({"response":"data recieved"})
    
    #input json should be name, username and password
    @app.route('/checkUser',methods=['GET'])
    def check_user():
        user_to_check=request.get_json()
        name=user_to_check['name']
        username=user_to_check['username']
        password=user_to_check['password']

        if gethashed_password_username(name)[0] == "invalid user name":
            return jsonify({"response" : "invalid name"})
        else:
            hashed_username=gethashed_password_username(name)[0]
            hashed_password=gethashed_password_username(name)[1]

        if (check_password_hash(hashed_username, username) and check_password_hash(hashed_password, password)):
            return jsonify({"response": "correct login info"})
        else:
            return jsonify({"response" : "incorrect username or password"})
    
    @app.route('/getcars', methods=['GET'])
    def get_cars():
        cars = Car.query.all()
        
        car_data = [{'id': car.id, 'make': car.make, 'model': car.model} for car in cars]
        return jsonify(car_data)
    
    # recieve date and return avaliable car object
    #incoming format {"start_date":"2010","end_date":"2020"}
    @app.route('/rent/date',methods=['POST','GET'])
    def check_aviabale_cars():
        dates=request.get_json()
        start_data=dates["start_date"]
        end_date=dates["end_date"]

        #if(the date range matches car) return cars
        available_cars=Car.qiery.all()

        return jsonify([{'id': car.id, 'make':car.make, 'model': car.model} for car in available_cars])
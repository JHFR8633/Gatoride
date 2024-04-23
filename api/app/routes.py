"""
from flask import jsonify, request
from flask_sqlalchemy import SQLAlchemy
from .models import User, Car
from .models import add_data, get_hashed_password, check_availability, update_reservation
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


def configure_routes(app):
    @app.route('/getcars', methods=['GET'])
    def get_cars():
        cars = Car.query.all()

        car_data = [{'id': car.id, 'make': car.make, 'model': car.model}
                    for car in cars]

        response = jsonify(car_data)
        # Allow requests from all origins
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    # recieve date and return avaliable car object
    # incoming format {"start_date":"2010...","end_date":"2020..."}

    @app.route('/rent/date', methods=['POST', 'GET'])
    def check_aviabale_cars():
        dates = request.get_json()
        available_cars = Car.query.all()
        available_cars = check_availability(dates)

        return jsonify([{'id': car.id, 'make': car.make, 'model': car.model} for car in available_cars])

    @app.route('/login/protected', methods=['GET'])
    @jwt_required()
    def protected():
        current_user = get_jwt_identity()
        if (current_user is None):
            return jsonify({"valid": False, "error": "Invalid Token", "data": None}), 401

        user_match = User.query.filter_by(username=current_user).first()

        if (user_match is None):
            return jsonify({"valid": False, "error": "Invalid Token", "data": None}), 401

        else:
            return jsonify({"valid": True, "error": "", "data": {"username": user_match.username, "email": user_match.email}}), 200

    # incoming format start 00040324 end ID
    @app.route('/reserve', methods=['POST'])
    def reserve_car():
        reserve = request.get_json()
        update_reservation(reserve)

    @app.route('/createReservation', methods=['POST'])
    def reserve_car():
        

    @app.route('/checkReservation',methods=['POST']):
    def check_car():
        check =request.get_json()
        check_availability(check)
        pass

    @app.route('/addCar', methods=['POST'])
    def add_car():
        if request.method == 'POST':
            data = request.json
        try:
            new_car = Car(id = data['id'], make=data['make'], model=data['model'], reservations='')
            db.session.add(new_car)
            db.session.commit()
            return jsonify({'message': 'Car added successfully', 'car': str(new_car)}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400

        return jsonify({'message': 'Invalid request method'}), 405

    @app.route('/deleteCar', methods=['POST'])
    def delete_for_car():
        if request.method == 'POST':
            data = request.json
        try:
            Car.query.filter_by(id=data['id']).delete()
            db.session.commit()
            return jsonify({'message': 'Car deleted successfully'}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
        
    @app.route('/login', methods=['POST'])
    def login():

        username = request.json.get('username', None)
        password = request.json.get('password', None)
        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            access_token = create_access_token(identity=username)
            return jsonify({"data": {"token": access_token}}), 200

        return jsonify({"error": "Invalid login credentials"}), 401
"""
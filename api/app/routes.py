from flask import jsonify, request
from flask_sqlalchemy import SQLAlchemy
from .models import User, Car
from .models import add_data, get_hashed_password
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


def configure_routes(app):
    @app.route('/members')
    def run():
        emails = [user.email for user in User.query.all()]
        return jsonify({"members": emails})


    @app.route('/addUser', methods=['POST'])
    def add_user():
        if request.is_json:
            data = request.json

            new_user = {}

            new_user['email'] = data["email"]
            new_user['username'] = data["username"]
            new_user['password'] = generate_password_hash(data["password"])
            new_user['role'] = data["client"] # creates a client account by default

            add_data(new_user)

            return jsonify(data)
        
        else:
            return jsonify({"error": "Request must contain JSON data"}), 400
       
    
    #input json should be name, username and password
    @app.route('/login',methods=['POST'])
    def login():
        username = request.json.get('username', None)
        password = request.json.get('password', None)
        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token), 200
        return jsonify({"msg": "Invalid login credentials"}), 401
    
    @app.route('/getcars', methods=['GET'])
    def get_cars():
        cars = Car.query.all()
        
        car_data = [{'id': car.id, 'make': car.make, 'model': car.model} for car in cars]

        response = jsonify(car_data)
        # Allow requests from all origins
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    
    # recieve date and return avaliable car object
    #incoming format {"start_date":"2010","end_date":"2020"}
    @app.route('/rent/date',methods=['POST','GET'])
    def check_aviabale_cars():
        dates=request.get_json()
        start_data=dates["start_date"]
        end_date=dates["end_date"]

        #if(the date range matches car) return cars
        available_cars=Car.query.all()

        return jsonify([{'id': car.id, 'make':car.make, 'model': car.model} for car in available_cars])
    
    @app.route('/login/protected', methods=['GET'])
    @jwt_required()
    def protected():
        current_user = get_jwt_identity()
        return jsonify(logged_in_as=current_user), 200

from flask import jsonify, request
from app.models.models import Car, User, find_by_id, create_instance, db
from app.models.user_methods import validate_token
from flask_jwt_extended import jwt_required #type: ignore



def configure_car_routes( app ):

    #Route to view all cars
    @app.route('/cars/admin', methods=['GET'])
    @jwt_required()
    def get_cars():
        try : 
            admin : User = validate_token()

            if ( admin.role != 'admin' ) : 
                raise Exception("Unauthorized", 400)
            
            cars = [car.data() for car in Car.query.all()]
            
            if( len(cars) > 0 ) : return jsonify( cars ), 200
            else : return jsonify("No cars in the Database"), 400

        except Exception as err :
            return jsonify( err.args[0] ), 400 
        
    #route to view all cars in location
    @app.route('/cars/employee', methods=['GET'])
    @jwt_required()
    def get_local_cars():
        try:
            employee : User = validate_token()

            if ( employee.role != 'employee' and employee.role != 'admin' ) : 
                raise Exception("Unauthorized", 400)
            
            cars = []

            for car in Car.query.all():
                if( car.location == employee.location ):
                    cars.append( car.data() )

            if( len(cars) > 0 ) : return jsonify( cars ), 200
            else : return jsonify("No cars available for this period"), 400

        except Exception as err:
            return jsonify( err.args[0] ), 400 
    
        
    #route to get all reservations of a car
    @app.route('/cars/reservations', methods=['GET'])
    def get_car_reservations():
        try :
            id = request.headers.get("id", None)
            car : Car = find_by_id( Car, id )

            return jsonify( car.reservation_dates() ), 200

        except Exception as err:
            return jsonify( err.args[0] ), 400
        
    
    # route to check if car is available
    @app.route('/cars/availability', methods=['GET'])
    def get_car_availability():
        try :
            start = request.headers.get("start", None)
            end = request.headers.get("end", None)
            id = request.headers.get("id", None)

            car : Car = find_by_id( Car, id )

            if( car.check_availability( start, end ) ) :
                return jsonify( car.data() ), 200
            else :
                return jsonify("Car not available for this period"), 400


        except Exception as err:
            return jsonify( err.args[0] ), 400 
        
    # route to get all available cars
    @app.route('/cars/available', methods=['GET'])
    def get_available_cars():
        try :
            start = request.headers.get("start", None)
            end = request.headers.get("end", None)
            cars = [] 

            for car in Car.query.all():
                if( car.check_availability( start, end ) ):
                    cars.append( car.data() )

            if( len(cars) > 0 ) : return jsonify( cars ), 200
            else : return jsonify("No cars available for this period"), 400

        except Exception as err:
            return jsonify( err.args[0] ), 400 


    # route to create a car
    @app.route('/cars/create', methods = ['POST'])
    @jwt_required()
    def create_car():
        if not request.is_json:
            return jsonify( "Request must contain json data" ), 400

        try :
            admin : User = validate_token()

            if ( admin.role != 'admin' ) : 
                raise Exception("Unauthorized", 400)
            
            request.json["status"] = "available"
            
            car = create_instance( Car, request.json )
            return jsonify(f"Create car with id {car.id}"), 200
        
        except Exception as err:
            return jsonify( err.args[0] ), 400
        
    
    # route to delete a car
    @app.route('/cars/delete', methods = ['POST'])
    @jwt_required()
    def delete_car():
        if not request.is_json:
            return jsonify( "Request must contain json data" ), 400

        try :
            admin : User = validate_token()

            if ( admin.role != 'admin' ) : 
                raise Exception("Unauthorized", 400)
            
            car : Car = find_by_id( Car, request.json["id"])
            car.remove()

            db.session.delete( car )
            db.session.commit()
            
            return jsonify(f"Removed car with id {request.json["id"]}"), 200
        
        except Exception as err:
            return jsonify( err.args[0] ), 400
        

    # route to edit a car
    @app.route('/cars/edit', methods = ['POST'])
    @jwt_required()
    def edit_car():
        if not request.is_json:
            return jsonify( "Request must contain json data" ), 400

        try :
            admin : User = validate_token()

            if ( admin.role != 'admin' and admin.role != 'employee' ) : 
                raise Exception("Unauthorized", 400)
        
            field = request.json["field"]
            value = request.json["value"]
            id = request.json["id"]

            car : Car = find_by_id( Car, id )

            if ( admin.role == 'employee' and admin.location != car.location ) : 
                raise Exception("This car is from a different location", 400)
            
            data = car.update_value( field, value )

            return jsonify(f"Changed {field} to {data}") , 200
        
        except Exception as err:
            return jsonify( err.args[0] ), 400

        
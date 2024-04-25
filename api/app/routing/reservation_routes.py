from flask import jsonify, request
from app.models.models import Reservation, User, create_instance, find_by_id, delete_instance
from flask_jwt_extended import jwt_required, get_jwt_identity #type: ignore
from app.models.user_methods import validate_token


def configure_reservation_routes( app ):

    # route to create reservation
    @app.route('/reservations/create', methods=['POST'])
    @jwt_required()
    def create_reservation():
        if not request.is_json:
            return jsonify( "Request must contain json data" ), 400

        try :
            request.json["user_id"] = get_jwt_identity()
            if request.json["user_id"] is None : raise Exception("Invalid Token", 400)

            instance : Reservation = create_instance( Reservation, request.json )
            instance.sync_reservation()

            return request.json, 200
        
        except Exception as err:
            return jsonify( err.args[0] ), 400
        
    
    # route to view all reservations
    @app.route('/reservations/employee', methods = ['GET'])
    @jwt_required()
    def get_reservations():
        try : 
            employee : User = validate_token()

            if ( employee.role != 'employee' and employee.role != 'admin' ) : 
                raise Exception("Unauthorized", 400)
            
            reservations = [reservation.data() for reservation in Reservation.query.all()]
            
            if( len(reservations) > 0 ) : return jsonify( reservations ), 200
            else : return jsonify("No reservations in the Database"), 400

        except Exception as err :
            return jsonify( err.args[0] ), 400 
        
    
    # route to create reservation for customer
    @app.route('/reservations/admin', methods=['POST'])
    @jwt_required()
    def create_reservation_admin():
        if not request.is_json:
            return jsonify( "Request must contain json data" ), 400

        try :
            employee : User = validate_token()

            if ( employee.role != 'employee' and employee.role != 'admin' ) : 
                raise Exception("Unauthorized", 400)

            instance : Reservation = create_instance( Reservation, request.json )
            instance.sync_reservation()

            return jsonify(f"Created Reservation with id {instance.id}"), 200
        
        except Exception as err:
            return jsonify( err.args[0] ), 400

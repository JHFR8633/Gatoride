from flask import jsonify, request
from app.models.models import User, Reservation, create_instance, check_duplicate_user, find_by_id
from app.models.user_methods import create_token, validate_token, check_password
from flask_jwt_extended import jwt_required #type: ignore


def configure_user_routes(app):
    @app.route('/users/create', methods = ['POST'])
    def create_user():
        if not request.is_json:
            return jsonify( "Request must contain json data" ), 400

        try :
            request.json["location"] = "A"
            request.json["role"] = "client"

            user = create_instance( User, request.json, check_duplicate_user)
            return jsonify( user.data() ), 200
        
        except Exception as err:
            return jsonify( err.args[0] ), 400
        
        
    @app.route('/users/admin', methods = ['POST'])
    @jwt_required()
    def create_user_admin():
        if not request.is_json:
            return jsonify( "Request must contain json data" ), 400

        try :
            employee : User = validate_token()

            if ( employee.role != 'employee' and employee.role != 'admin' ) : 
                raise Exception("Unauthorized", 400)
            
            if ( employee.role == 'employee' ) :
                request.json["location"] = "A"
                request.json["role"] = "client"

            user = create_instance( User, request.json, check_duplicate_user)
            return jsonify( f"User created with id {user.id}" ), 200
        
        except Exception as err:
            return jsonify( err.args[0] ), 400
        
        
    @app.route('/users/token', methods = ['GET'])
    def retrieve_token():
        try :
            username = request.headers.get("username", None)
            password = request.headers.get("password", None)

            user = check_password( username, password )
            token = create_token( user )

            return jsonify({ "token" : token, "user" : user.data() }), 200


        except Exception as err:
            return jsonify( err.args[0] ), 400 
        
        
    @app.route('/users/validate', methods = ['GET'])
    @jwt_required()
    def check_token():
        try:
            match : User = validate_token()
            return jsonify( match.data() ), 200

        except Exception as err:
            return jsonify( err.args[0] ), 400 
        

    @app.route('/users/edit', methods = ['POST'])
    @jwt_required()
    def edit_user():
        if not request.is_json:
            return jsonify( "Request must contain json data" ), 400

        try :
            admin : User = validate_token()

            if ( admin.role != 'admin' ) : 
                raise Exception("Unauthorized", 400)
        
            field = request.json["field"]
            value = request.json["value"]
            id = request.json["id"]

            user : User = find_by_id( User, id )
            data = user.update_value( field, value )

            return jsonify(f"Changed {field} to {data}") , 200
        
        except Exception as err:
            return jsonify( err.args[0] ), 400
        
    @app.route('/users/self', methods = ['POST'])
    @jwt_required()
    def edit_self():
        if not request.is_json:
            return jsonify( "Request must contain json data" ), 400

        try :
            user : User = validate_token()

            field = request.json["field"]
            value = request.json["value"]

            if( field != "username" and field != "password" and field != "email" ) :
                raise Exception("Unauthorized", 400)
        
            data = user.update_value( field, value )

            return jsonify(f"Changed {field} to {data}") , 200
        
        except Exception as err:
            return jsonify( err.args[0] ), 400
        

    @app.route('/users/reservations', methods = ['GET'])
    @jwt_required()
    def get_user_reservations():
        try:
            user : User = validate_token()
            reservations = []

            if user.reservations is None : return jsonify(None), 200

            for id in user.reservations.split(','):
                reservation = find_by_id( Reservation, int(id) )
                if not reservations is None : reservations.append( reservation.data() )

            if reservations == [] : return jsonify(None), 200

            return jsonify( reservations ), 200

        except Exception as err:
            return jsonify( err.args[0] ), 400 

        
    @app.route('/users/employee', methods = ['GET'])
    @jwt_required()
    def get_users():
        try : 
            employee : User = validate_token()

            if ( employee.role != 'employee' and employee.role != 'admin' ) : 
                raise Exception("Unauthorized", 400)
            
            users = [user.data() for user in User.query.all()]
            
            if( len(users) > 0 ) : return jsonify( users ), 200
            else : return jsonify("No users in the Database"), 400

        except Exception as err :
            return jsonify( err.args[0] ), 400 


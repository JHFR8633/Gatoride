from flask_jwt_extended import create_access_token, get_jwt_identity #type: ignore
from flask_bcrypt import check_password_hash #type: ignore
from .models import User, find_by_id, build_instance, create_instance, check_duplicate_user, db
import random

def find_user_by_username( username ) -> User :
    match = User.query.filter_by( username = username ).first()
    
    if match is None :
        raise Exception( User.__name__ + " not found", 400)
    
    return match

def check_password( username, password ) :
    try :
        user = find_user_by_username( username )

        if check_password_hash( user.password, password ) :
            return user

        raise Exception("Password or Username invalid", 400)
      
    except:
        raise Exception("Password or Username invalid", 400)

def create_token( user ) :
    try :
        return create_access_token( identity = user.id ) 
    except Exception as err :
        raise err
    
def validate_token() :
    try : 
        id = get_jwt_identity()
        if id is None : raise Exception("Invalid Token", 400)
        return find_by_id( User, id )
    
    except Exception as err :
        raise err
    
def create_admin_account() : 
    try :
        data = {
            'username' : 'admin',
            'password' : 'admin',
            'email' : 'email',
            'location' : 'A',
            'role' : 'admin'
        }

        create_instance( User, data, check_duplicate_user)
        print("Admin Created")

    except :
        raise Exception("Failed to create Admin", 400)
    
def create_employee_accounts( ammount ) :
    try :
        for i in range(1, ammount + 1) :
            data = {
                'username': f'E{i}', 
                'password': f'E{i}', 
                'email': f'E{i}', 
                'location': random.choice(['A', 'B', 'C']), 
                'role': 'employee'
            }
    
            build_instance( User, data, check_duplicate_user)

        db.session.commit()

        print("Admin Created")

    except :
        raise Exception("Failed to create Admin", 400)
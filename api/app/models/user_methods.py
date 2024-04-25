from flask_jwt_extended import create_access_token, get_jwt_identity #type: ignore
from flask_bcrypt import check_password_hash #type: ignore
from .models import User, find_by_id, build_instance, create_instance, check_duplicate_user, db
import random

# find a user by the username
def find_user_by_username( username ) -> User :
    match = User.query.filter_by( username = username ).first()
    
    if match is None :
        raise Exception( User.__name__ + " not found", 400)
    
    return match

# check if user password is correct
def check_password( username, password ) :
    try :
        user = find_user_by_username( username )

        if check_password_hash( user.password, password ) :
            return user

        raise Exception("Password or Username invalid", 400)
      
    except:
        raise Exception("Password or Username invalid", 400)

# create a token for the user
def create_token( user ) :
    try :
        return create_access_token( identity = user.id ) 
    except Exception as err :
        raise err
    
# validate the token as a user
def validate_token() :
    try : 
        id = get_jwt_identity()
        if id is None : raise Exception("Invalid Token", 400)
        return find_by_id( User, id )
    
    except Exception as err :
        raise err
    
# create admin account
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

# create employee accounts  
def create_employee_accounts() :
    try :
        for i in range(1, 101 ) :
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
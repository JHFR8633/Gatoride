from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_bcrypt import generate_password_hash # type: ignore
from datetime import datetime

db = SQLAlchemy()

def build_date( start_full, end_full ):
    start = ''.join(start_full.split('-'))
    end = ''.join(end_full.split('-'))

    if start > end : raise Exception("Date is invalid", 400)
    return start + end

class Reservation(db.Model):
    __name__ = "Reservation"

    id = db.Column(db.Integer, primary_key=True); tag = db.Column(db.Text)
    user_id = db.Column(db.Integer); car_id = db.Column(db.Integer)
    start = db.Column(db.Text); end = db.Column(db.Text)
    
    def __repr__( self ):
        return '<Reservation %r %r>' % (self.reservation_id, self.user_id)
    
    def data( self ):
        return {'id': self.id, 'user_id': self.user_id, 'car_id': self.car_id, 'start' : self.start, 'end' : self.end }
    
    def __init__( self, reservation_data ):
        try :
            self.user_id = reservation_data["user_id"]; self.car_id = reservation_data["car_id"]
            self.start = reservation_data["start"]; self.end = reservation_data["end"]

            if self.start is None or self.end is None : raise Exception("Failed to create " + self.__name__ + ", Some data is missing", 400)

        except :
            raise Exception("Failed to create " + self.__name__ + ", Some data is missing", 400)
        
    def sync_reservation( self ):
        try :
            user : User = find_by_id( User, self.user_id )
            car : Car = find_by_id( Car, self.car_id )

            add_reservation( user, self.id )
            add_reservation( car, self.id )

            if not car.check_availability( self.start, self.end ) :
                raise Exception("Car unavailable", 400)
            
            car.add_date( build_date( self.start, self.end ) )
            db.session.commit()
               
        except Exception as err:
            raise err

def delete_instance( instance ):
    db.session.delete(instance)
    db.session.commit()

class Car(db.Model):
    __name__ = "Car"

    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(80)); model = db.Column(db.String(80))
    type = db.Column(db.String(80)); location = db.Column(db.String(80))
    day = db.Column(db.String(80)); mile = db.Column(db.String(80))
    mileage = db.Column(db.String(80)); status = db.Column(db.String(80))
    reservations = db.Column(db.Text); dates = db.Column(db.Text)

    def __repr__(self):
        return '<Car %r %r>' % (self.make, self.model)
    
    def data( self ):
        return {'id': self.id, 'make': self.make, 'model': self.model, "type" : self.type,
                'location' : self.location, 'day' : self.day, 'mile' : self.mile,
                'mileage' : self.mileage, 'status' : self.status }
    
    def __init__( self, car_data ):
        try : 
            self.make = car_data["make"]; self.model = car_data["model"]
            self.type = car_data["type"]; self.location = car_data["location"]
            self.day = car_data["day"]; self.mile = car_data["mile"]
            self.mileage = car_data["mileage"]; self.status = car_data["status"]

            self.reservations = None; self.dates = None
        except :
            raise Exception("Failed to create " + self.__name__+ ", Some data is missing", 400)
        
    def add_date( self, date ):
        try : 
            if self.dates is None : self.dates = date
            
            else :
                dates = self.dates.split(',')
                dates.append( date)

                dates.sort()
                self.dates = ','.join(dates)
        except : 
            raise Exception("Failed to add date to Car reservation dates", 400)
        
    def reservation_dates( self ):
        try : 
            if self.dates is None : return []
            else : return self.dates.split(',')
        except : 
            raise Exception("Something went wrong with `reservation_dates()`", 400)
        
    def check_availability( self, start, end ):
        try :
            if self.status != "available" : return False
            if start is None or end is None : return True
            if self.dates is None : return True
            
            else :
                date = build_date( start, end )
                dates = self.dates.split(',')

                max_index = len(dates)
                index = 0

                while ( index < max_index and date > dates[index] ) : index += 1

                # First element - the end date must be smaller than next start date
                if index == 0 :
                    if ( date[8:] < dates[index][:8] ) : return True
    
                # Last element - The start date must be bigger than previous end date
                elif index == max_index :
                    if ( date[:8] > dates[index - 1][8:]) : return True
                
                # Middle element - Both of the previous conditions must be true in this case
                elif ( date[8:] < dates[index][:8] and date[:8] < dates[index - 1][8:] ) : 
                    return True
                
                else : return False
            
        except Exception as err :
            raise err
        

    def remove( self ):
        try :
            if self.reservations is None : return
            if self.reservations == '' : return

            reservations = self.reservations.split(',')

            for reservation_id in reservations:
                reservation = find_by_id( Reservation, reservation_id )
                if not reservation is None : db.session.delete( reservation )

        except Exception as err :
            raise err
        
    def update_value( self, field, value ):
        if value is None : raise Exception("Invalid Value", 400)

        match field :
            case "make" : 
                self.make = value
            case "model" : 
                self.model = value
            case "type" : 
                self.email = value
            case "location" : 
                self.location = value
            case "mileage" : 
                self.mileage = value
            case "day" : 
                self.day = value
            case "mile" : 
                self.mile = value
            case _:
                raise Exception("Invalid Field", 400)
            
        db.session.commit()
        return value


class User( db.Model ):
    __name__ = "User"

    id = db.Column(db.Integer, primary_key=True); email = db.Column(db.String(80))
    username = db.Column(db.String(80)); password = db.Column(db.String(80))
    reservations = db.Column(db.Text); role = db.Column(db.String(80))
    location = db.Column(db.String(80))

    def __repr__( self ):
        return '<User %r>' % self.username
    
    def data( self ):
        return { "email" : self.email, "username" : self.username, "location" : self.location, "role" : self.role, "id" : self.id }
    
    def update_value( self, field, value ):
        if value is None : raise Exception("Invalid Value", 400)

        match field :
            case "username" : 
                check_duplicate_username( value )
                self.username = value
            case "password" : 
                hash = generate_password_hash(value)
                self.password = hash
            case "email" : 
                check_duplicate_email( value )
                self.email = value
            case "location" : 
                self.location = value
            case "role" : 
                self.role = value
            case _:
                raise Exception("Invalid Field", 400)
            
        db.session.commit()
        return value
                

    def __init__( self, user_data ):
        try : 
            self.username = user_data["username"]; self.email = user_data["email"]
            self.password = generate_password_hash(user_data["password"])
            self.role = user_data["role"]; self.reservations = None
            self.location = user_data["location"]
        except :
            raise Exception("Failed to create " + self.__name__+ ", Some data is missing", 400)


def add_reservation( object, id ):
    try : 
        if object.reservations is None : object.reservations = id
        else : object.reservations += ( ',' + str(id) )
    except : 
        raise Exception( object.reservations, 400)
    
def find_by_id( type , id ):
    match = type.query.filter_by( id = id ).first()
    
    if match is None :
        raise Exception( type.__name__ + " not found", 400)
    
    return match
         
def no_check( data ):
    return

def create_instance( type, data, check_duplicate = no_check):
    try : 
        instance = build_instance( type, data, check_duplicate )

        db.session.commit()
        return instance
    
    except Exception as err :
        raise err
    
def build_instance( type, data, check_duplicate = no_check ):
    try : 
        instance = type( data )
        check_duplicate( instance ) 

        db.session.add( instance )
        return instance
    
    except Exception as err :
        raise err
    

def check_duplicate_user( user : User ):
    check_duplicate_username( user.username )
    check_duplicate_email( user.email )


def check_duplicate_username( username ):
    if not User.query.filter_by( username = username ).first() is None :
        raise Exception("This username is already taken", 400)
    
def check_duplicate_email( email ):
    if not User.query.filter_by( email = email ).first() is None : 
        raise Exception("This email is already registered", 400)
    


    

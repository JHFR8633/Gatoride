from .models import db, Reservation, User, Car, find_by_id

def create_reservation( reservation_data ):
    reservation = Reservation( reservation_data )

    try :
        user = find_by_id( User, reservation.user_id )
        car = find_by_id( Car, reservation.car_id )
    
        user.add_reservations( reservation )
        car.add_reservations( reservation )

        db.session.add( reservation )
        db.session.commit()

        return True

    except Exception as err :
        print( err.args )
        return False

#A tag is 12 digits
def check_end_previous(tag, reservations, i):
    end = reservations[i - 1][0:5]
    start = tag[0:5]
    
    if ( start > end ) : return True
    if ( start < end ) : return False
    else : #EDGE case 
        return

def check_start_next(tag, reservations, i):
    end = tag[5:9]
    start = reservations[i][0:5]
    
    if( end < start ) : return True
    if( end > start ) : return False
    else: # ==
        
        return

def check_availability(my_Json):
    tag = build_tag(my_Json["start_date"], my_Json["end_date"], "0000")
    available_cars = []

    for cars in Car.query.all():
        reservations = cars.reservations.split(',')
        n = len(reservations)
        i = 0

        while( i < n and tag >= reservations[i] ) : i += 1

        if( i == n ) : #Check only end date of previous
            check_end_previous(tag, reservations, i)

        if( i == 0 ) : #Check only start date of next
            pass
        
        else : #Check Both
            return 



from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(80))
    model = db.Column(db.String(80))
    reservations = db.Column(db.Text)

    def __repr__(self):
        return '<Car %r %r>' % (self.make, self.model)
    
class Reservation(db.Model):
    reservation_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    car_id = db.Column(db.Integer)
    start = db.Column(db.Text)
    end = db.Column(db.Text)
    tag = db.Column(db.Text)

    def __repr__(self):
        return '<Reservation %r %r>' % (self.reservation_id, self.user_id)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80))
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))
    reservations = db.Column(db.Text)
    # role = db.Column(db.String(80)) # either "admin", "employee", or "client"

    def __repr__(self):
        return '<User %r>' % self.username


def add_data(my_dic):
    new_user = User(
        email=my_dic["email"], username=my_dic["username"], password=my_dic["password"])
    db.session.add(new_user)
    db.session.commit()

def add_reservation(my_json):
    tag = build_tag(my_json["start"], my_json["end"])

    new_reservation = Reservation(
        reservation_id = my_json["reservation_id"], user_id = my_json["user_id"], tag = tag
        start = my_json["start"], end = my_json["end"], car_id = my_json["car_id"]
    )
    
    user = User.query.filter_by(id=new_reservation.user_id).first()
    car = Car.query.filter_by(id=new_reservation.car_id).first()


    reservations = user.reservations.split(',')
    reservations.append(new_reservation.reservation_id)
    reservations.sort()
    user.reservations = reservations.join(',')

    reservations = car.reservations.split(',')
    reservations.append(tag + new_reservation.reservation_id)
    reservations.sort()
    car.reservations = reservations.join(',')

#take in 3 strings
def build_tag(start, end):
    return start[2:6] + end[2:6]

def build_reservation()

def update_reservation(my_Json):
    ID = my_Json["id"]
    start = my_Json["start_date"]
    end = my_Json["end_date"]
    start_ob = datetime.strptime(start, "%Y-%m-%d")
    end_ob = datetime.strptime(end, "%Y-%m-%d")

    start_epoch = int(start_ob.timestamp())
    end_epoch = int(end_ob.timestamp())  # standard time since epoch

    # if(the date range matches car) return cars
    available_cars = Car.query.all()

    update_car = Car.query.filter_by(id=ID)  # column_name = input

    existing_dates = update_car.reserve_date or ''  # Get existing dates or initialize

    new_dates_str = existing_dates + ',' + str(start_epoch)
    new_dates_str = existing_dates + ',' + str(end_epoch)

    update_car.reserve_date = new_dates_str
    db.session.commit()



# return password and username of a user


def gethashed_password_username(user_name):
    # .first() return the first occurance of the data, can remove after implementing dupe check
    user = User.query.filter_by(username=user_name).first()
    if user is None:
        return ["invalid user name"]
    return [user.username, user.password]


def get_hashed_password(username_):
    user = User.query.filter_by(username=username_).first()
    return user


def create_dummy_cars():
    # List of dummy car data
    dummy_data = [
        {'make': 'Toyota', 'model': 'Corolla'},
        {'make': 'Ford', 'model': 'F-150'},
        {'make': 'Honda', 'model': 'Civic'},
        {'make': 'Tesla', 'model': 'Model S'},
        {'make': 'Chevrolet', 'model': 'Impala'}
    ]

    # Create and add dummy cars to the database
    for car_data in dummy_data:
        car = Car(make=car_data['make'], model=car_data['model'])
        db.session.add(car)

    # Commit the transaction
    db.session.commit()

    print("Dummy cars added to the database.")

def check_availability(my_Json):
    start_date = my_Json["start_date"]
    end_date = my_Json["end_date"]

    start_ob = datetime.strptime(start_date, "%m/%d/%Y")
    end_ob = datetime.strptime(end_date, "%m%d%Y")

    start_epoch = int(start_ob.timestamp())
    end_epoch = int(end_ob.timestamp())  # standard time since epoch

    available_cars = []
    for cars in Car.query.all():
        existing_dates = cars.reserve_dates_text
        existing_dates_list = existing_dates.split(',')

        for i in range(0, len(existing_dates_list), 2):
            if start_epoch > existing_dates_list[i] and start_epoch < existing_dates_list[i+1]:
                pass
            elif start_epoch < existing_dates_list[i] and end_epoch > existing_dates_list[i]:
                pass
            if i == len(existing_dates_list):
                available_cars.append(cars)

    return available_cars

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
            
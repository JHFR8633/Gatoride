from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(80))
    model = db.Column(db.String(80))
    reserve_date = db.Column(db.Text)

    def __repr__(self):
        return '<Car %r %r>' % (self.make, self.model)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80))
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))
    # role = db.Column(db.String(80)) # either "admin", "employee", or "client"

    def __repr__(self):
        return '<User %r>' % self.username


def add_data(my_dic):
    new_user = User(
        email=my_dic["email"], username=my_dic["username"], password=my_dic["password"])
    db.session.add(new_user)
    db.session.commit()


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

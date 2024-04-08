from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(80))
    model = db.Column(db.String(80)) 

    def __repr__(self):
        return '<Car %r %r>' % (self.make, self.model)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80))
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))
    #role = db.Column(db.String(80)) # either "admin", "employee", or "client"
                     
    def __repr__(self):
        return '<User %r>' % self.username
    
def add_data(my_dic):
    new_user = User(email=my_dic["email"], username=my_dic["username"], password=my_dic["password"])
    db.session.add(new_user)
    db.session.commit()

# return password and username of a user
def gethashed_password_username(user_name):
    user = User.query.filter_by(username=user_name).first() #.first() return the first occurance of the data, can remove after implementing dupe check
    if user is None:
        return ["invalid user name"]
    return [user.username,user.password]

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

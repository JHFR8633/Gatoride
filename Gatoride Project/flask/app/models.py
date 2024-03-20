from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(80))
    model = db.Column(db.String(80)) 

    def __repr__(self):
        return '<Car %r %r>' % (self.make, self.model)

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))

    def __repr__(self):
        return '<Person %r>' % self.name
    
def add_data(my_dic):
    new_person = Person(name=my_dic["name"], username=my_dic["username"], password=my_dic["password"])
    db.session.add(new_person)
    db.session.commit()


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

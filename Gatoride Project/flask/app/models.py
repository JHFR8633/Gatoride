from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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
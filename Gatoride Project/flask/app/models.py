from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    age = db.Column(db.Integer)
    height = db.Column(db.Float)

    def __repr__(self):
        return '<Person %r>' % self.name
    
def add_data(my_dic):
    new_person = Person(name=my_dic["name"], age=my_dic["age"], height=my_dic["height"])
    db.session.add(new_person)
    db.session.commit()
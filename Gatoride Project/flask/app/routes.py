from flask import jsonify, request
from flask_sqlalchemy import SQLAlchemy
from .models import Person
from .models import add_data
from .models import Car

def configure_routes(app):
    @app.route('/members')
    def run():
        members = [person.name for person in Person.query.all()]
        return jsonify({"members": members})
    
    @app.route('/sendJson', methods=['POST'])
    def getData():
        myData=request.get_json()
        add_data(myData)
        members = [person.name for person in Person.query.all()]
        return "data recieved"
    
    @app.route('/getcars')
    def get_cars():
        cars = Car.query.all()
        
        car_data = [{'id': car.id, 'make': car.make, 'model': car.model} for car in cars]
        return jsonify(car_data)
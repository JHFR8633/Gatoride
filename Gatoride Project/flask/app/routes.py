from flask import jsonify, request
from flask_sqlalchemy import SQLAlchemy
from .models import Person
from .models import add_data


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
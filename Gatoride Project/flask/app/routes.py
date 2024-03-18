from flask import jsonify, request
from .models import Person
from app.dummy_data import add_dummy_data, add_data


def configure_routes(app):
    @app.route('/members')
    def run():
        members = [person.name for person in Person.query.all()]
        return jsonify({"members": members})
    
    @app.route('/sendJson', methods=['POST'])
    def getData():
        #add_dummy_data()
        myData=request.get_json()
        add_data(myData)
        return jsonify(myData)
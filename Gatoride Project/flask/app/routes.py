from flask import jsonify, request
from .models import Person

global haveData
haveData=False
global myData
myData={}
def configure_routes(app):
    @app.route('/members')
    def run():
        members = [person.name for person in Person.query.all()]
        return jsonify({"members": members})
    
    @app.route('/sendJson', methods=['POST'])
    def getData():
        myData=request.get_json()
        name=myData['name']
        haveData=True
        return jsonify(myData)
    
def retrieve_data():
    return myData
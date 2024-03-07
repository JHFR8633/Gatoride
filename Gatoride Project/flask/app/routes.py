from flask import jsonify
from .models import Person

def configure_routes(app):
    @app.route('/members')
    def run():
        members = [person.name for person in Person.query.all()]
        return jsonify({"members": members})

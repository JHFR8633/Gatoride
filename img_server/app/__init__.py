from flask import Flask
from .routes import configure_routes


def create_app():
    app = Flask(__name__) 
    app.config['STATIC_FOLDER'] = '/img_server/static'

    with app.app_context():
        configure_routes(app)
        
    return_status(True)
    return app

def return_status(status):
    if status:
        return "successful"
    else:
        return "unsuccessful"
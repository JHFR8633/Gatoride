from flask import request
from app import create_app
from app.dummy_data import add_data
from app.routes import haveData


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        if haveData:    
            add_data()
    app.run(debug=True)
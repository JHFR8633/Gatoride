from app import create_app
from app.dummy_data import add_dummy_data

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        add_dummy_data()
    app.run(debug=True)
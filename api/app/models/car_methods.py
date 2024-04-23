from .models import db, Car, build_instance

def testing_data_cars():
    cars = [
        {'make': 'Toyota', 'model': 'Corolla', 'type': 'Sedan', 'location': 'A', 'mileage': "5000", 'day': "50", 'mile': "0.25", 'status': 'available'},
        {'make': 'Ford', 'model': 'F-150', 'type': 'Truck', 'location': 'B', 'mileage': "8000", 'day': "70", 'mile': "0.35", 'status': 'repair'},
        {'make': 'Honda', 'model': 'Civic', 'type': 'Sedan', 'location': 'A', 'mileage': "6000", 'day': "45", 'mile': "0.20", 'status': 'unavailable'},
        {'make': 'Tesla', 'model': 'Model S', 'type': 'Electric', 'location': 'C', 'mileage': "2000", 'day': "150", 'mile': "0.50", 'status': 'available'},
        {'make': 'Chevrolet', 'model': 'Impala', 'type': 'Sedan', 'location': 'A', 'mileage': "7000", 'day': "55", 'mile': "0.30", 'status': 'available'},
        {'make': 'Nissan', 'model': 'Altima', 'type': 'Sedan', 'location': 'B', 'mileage': "5500", 'day': "48", 'mile': "0.22", 'status': 'unavailable'},
        {'make': 'Volkswagen', 'model': 'Jetta', 'type': 'Sedan', 'location': 'C', 'mileage': "6500", 'day': "52", 'mile': "0.28", 'status': 'unavailable'},
        {'make': 'Subaru', 'model': 'Outback', 'type': 'SUV', 'location': 'A', 'mileage': "7500", 'day': "60", 'mile': "0.32", 'status': 'available'},
        {'make': 'BMW', 'model': '3 Series', 'type': 'Sedan', 'location': 'B', 'mileage': "4000", 'day': "130", 'mile': "0.45", 'status': 'available'},
        {'make': 'Mercedes-Benz', 'model': 'C-Class', 'type': 'Sedan', 'location': 'C', 'mileage': "3000", 'day': "140", 'mile': "0.48", 'status': 'unavailable'},
        {'make': 'Hyundai', 'model': 'Elantra', 'type': 'Sedan', 'location': 'A', 'mileage': "8500", 'day': "40", 'mile': "0.18", 'status': 'available'},
        {'make': 'Audi', 'model': 'A4', 'type': 'Sedan', 'location': 'B', 'mileage': "5000", 'day': "125", 'mile': "0.42", 'status': 'unavailable'},
        {'make': 'Kia', 'model': 'Optima', 'type': 'Sedan', 'location': 'C', 'mileage': "6000", 'day': "42", 'mile': "0.20", 'status': 'available'},
        {'make': 'Mazda', 'model': 'Mazda3', 'type': 'Sedan', 'location': 'A', 'mileage': "7000", 'day': "47", 'mile': "0.21", 'status': 'unavailable'},
        {'make': 'Lexus', 'model': 'ES', 'type': 'Sedan', 'location': 'B', 'mileage': "3500", 'day': "135", 'mile': "0.47", 'status': 'available'},
        {'make': 'Chrysler', 'model': '300', 'type': 'Sedan', 'location': 'C', 'mileage': "5000", 'day': "50", 'mile': "0.25", 'status': 'unavailable'},
        {'make': 'Volvo', 'model': 'S60', 'type': 'Sedan', 'location': 'A', 'mileage': "4000", 'day': "120", 'mile': "0.40", 'status': 'available'},
        {'make': 'Buick', 'model': 'Regal', 'type': 'Sedan', 'location': 'B', 'mileage': "4500", 'day': "55", 'mile': "0.29", 'status': 'available'},
        {'make': 'Infiniti', 'model': 'Q50', 'type': 'Sedan', 'location': 'C', 'mileage': "5000", 'day': "130", 'mile': "0.46", 'status': 'unavailable'},
        {'make': 'Cadillac', 'model': 'CTS', 'type': 'Sedan', 'location': 'A', 'mileage': "3800", 'day': "140", 'mile': "0.49", 'status': 'available'},
        {'make': 'Acura', 'model': 'TLX', 'type': 'Sedan', 'location': 'B', 'mileage': "4800", 'day': "125", 'mile': "0.41", 'status': 'unavailable'},
        {'make': 'Lincoln', 'model': 'MKZ', 'type': 'Sedan', 'location': 'C', 'mileage': "5200", 'day': "60", 'mile': "0.33", 'status': 'available'}
    ]


    for car in cars:
        build_instance( Car, car )

    db.session.commit()

    print("Testing data for cars has been added to the database.")
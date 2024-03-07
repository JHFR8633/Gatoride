from .models import db, Person

def add_dummy_data():
    # Add dummy data to the database
    dummy_people = [
        {"name": "John Doe", "age": 30, "height": 175.5},
        {"name": "Jane Doe", "age": 25, "height": 165.0},
        {"name": "Alice Smith", "age": 35, "height": 170.0}
        # Add more dummy data as needed
    ]

    for person_data in dummy_people:
        new_person = Person(name=person_data['name'], age=person_data['age'], height=person_data['height'])
        db.session.add(new_person)

    db.session.commit()

    print("Dummy data added successfully!")

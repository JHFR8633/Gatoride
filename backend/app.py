from flask import Flask, jsonify

api = Flask(__name__)

@api.route('/home')
def my_profile():
    response_body = {
        "name": "Gatoride",
        "about": "This is a Intro to SWE project!"
    }

    return jsonify(response_body)

if __name__ == '__main__':
    api.run(debug=True)
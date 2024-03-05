from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/members")
def run():
    return {"members": ["John", "Joe", "Patrick", "Christian"]}

@app.route('/api/button-click', methods=['POST'])
def handle_button_click():
    try:
        data = request.json
        # Process the data (e.g., save to database, perform an action, etc.)
        # ...
        return jsonify({'message': 'Button click received successfully!'})
    except Exception as e:
        return jsonify({'error': str(e)})
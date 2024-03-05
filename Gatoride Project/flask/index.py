from flask import Flask

app = Flask(__name__)

@app.route("/members")
def run():
    return {"members": ["John", "Joe", "Patrick", "Christian"]}
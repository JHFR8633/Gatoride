from flask import Flask

app = Flask(__name__)

@app.route("/")

def run():
    return "{\"Flask is working!\"}"
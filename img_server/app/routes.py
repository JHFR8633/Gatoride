from flask import send_from_directory

def configure_routes(app):
    @app.route('/<img_id>')
    def run(img_id):
        response = send_from_directory(app.config["STATIC_FOLDER"], f"{img_id}.jpg")
        # Allow requests from all origins
        
        return response

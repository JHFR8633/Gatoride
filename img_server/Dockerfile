# Base image with python installed
FROM python:3-alpine3.18

# Setup the working directory where files are
WORKDIR /img_server

# Install all requirements
COPY requirements.txt /img_server
RUN pip install -r requirements.txt

# Copy all the files here to the working directory
COPY run.py /img_server

# Expose the port used by flask
EXPOSE 4000

# Set the FLASK_APP environment variable to your Flask application file
ENV FLASK_APP=run.py

# Run the flask program
CMD ["flask", "run", "--debug", "--port=4000", "--host=0.0.0.0"]
# Base image with python installed
FROM python:3-alpine3.18

# Setup the working directory where files are
WORKDIR /api

# Install all requirements
COPY requirements.txt /api
RUN pip install -r requirements.txt

# Copy all the files here to the working directory
COPY run.py /api
COPY persons.db /api

# Expose the port used by flask
EXPOSE 3000

# Set the FLASK_APP environment variable to your Flask application file
ENV FLASK_APP=run.py

# Run the flask program
CMD ["flask", "run", "--debug", "--port=3000", "--host=0.0.0.0"]
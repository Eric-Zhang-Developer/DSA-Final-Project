
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Setup
app = Flask(__name__)
CORS(app)  

# API Route 
@app.route('/')
def hello():
    return "Twitter Traverse API is running!"

# Execute 
if __name__ == '__main__':
    app.run(debug=True, port=5000)
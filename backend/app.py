
from flask import Flask, request, jsonify
from flask_cors import CORS
from core.load_graph import load_path
from core.Dijkstra import run_dijkstra
from core.a_star import a_star
import sys
import os

# Setup
app = Flask(__name__)
CORS(app)  

# Load graph once at startup
print("Loading Twitter graph...")
try:
    graph = load_path("backend/data/twitter_combined.txt")
    print("Graph loaded successfully!")
except Exception as e:
    print(f"Error loading graph: {e}")
    graph = None

# API Route 
@app.route('/')
def hello():
    return "Twitter Traverse API is running!"

# Execute 
if __name__ == '__main__':
    app.run(debug=True, port=5000)
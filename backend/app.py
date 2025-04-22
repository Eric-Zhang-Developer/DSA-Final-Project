
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

@app.route('/api/compare', methods=['POST'])
def compare():
    # error handling for failure to load
    if graph is None:
        return jsonify({"error": "Graph failed to load"}), 500
    
    data = request.json
    start = data.get('start')
    end = data.get('end')
    
    # error handling for no id 
    if not start or not end:
        return jsonify({"error": "Missing start or end user ID"}), 400
    
    # Run both algorithms
    dijkstra_result = run_dijkstra(graph, start, end)
    astar_result = a_star(graph, start, end)
    
    # Debugging - log success
    print(f" SUCCESS: Path found from {start} to {end}")
    print(f" - Dijkstra path length: {len(dijkstra_result['path'])}")
    print(f" - A* path length: {len(astar_result['path'])}")

    # Return both results
    return jsonify({
        "dijkstra": dijkstra_result,
        "a_star": astar_result
    })

# Execute 
if __name__ == '__main__':
    app.run(port=5000, debug=True)
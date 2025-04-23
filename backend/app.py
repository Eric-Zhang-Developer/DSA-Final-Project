
from flask import Flask, request, jsonify
from flask_cors import CORS
from core.load_graph import load_path
from core.Dijkstra import run_dijkstra
from core.a_star import a_star
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

    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Origin', 'https://twitter-traverse.vercel.app/')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

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

    return jsonify({
        "dijkstra": {
            "start": dijkstra_result["start"],  
            "end": dijkstra_result["end"],     
            "runtime_seconds": dijkstra_result["runtime_seconds"],
            "nodes_expanded": dijkstra_result["nodes_expanded"],
            "cost": dijkstra_result["cost"],
            "path": dijkstra_result["path"]
        },
        "a_star": {
            "start": astar_result["start"],
            "end": astar_result["end"],
            "runtime_seconds": astar_result["runtime_seconds"],
            "nodes_expanded": astar_result["nodes_expanded"],
            "cost": astar_result["cost"],
            "path": astar_result["path"]
        }
    })

# Execute 
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
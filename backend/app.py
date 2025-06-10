
from flask import Flask, request, jsonify
from flask_cors import CORS
from core.load_graph import load_path
from core.Dijkstra import run_dijkstra
from core.bfs import bfs
import os

# Setup
app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:3000",
    "https://twitter-traverse.vercel.app",
    "https://twitter-traverse.vercel.app/"
])

# Load graph once at startup
print("Loading Twitter graph...")
try:
    graph = load_path("backend/data/twitter_combined.txt")
    print("Graph loaded successfully!")
except Exception as e:
    print(f"Error loading graph: {e}")
    graph = None

# Health Check 
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200


@app.route('/api/compare', methods=['POST'])
def compare():
    if request.method == 'POST':
        
        # error handling for failure to load
        if graph is None:
            return jsonify({"error": "Graph failed to load"}), 500
        
        try:
            data = request.json
            start = data.get('start')
            end = data.get('end')
            
            # error handling for no id 
            if not start or not end:
                return jsonify({"error": "Missing start or end user ID"}), 400
            
            # Run both algorithms
            dijkstra_result = run_dijkstra(graph, start, end)
            bfs_result = bfs(graph, start, end)
            
            # Debugging - log success
            print(f" SUCCESS: Path found from {start} to {end}")
            print(f" - Dijkstra path length: {len(dijkstra_result['path'])}")
            print(f" - BFS path length: {len(bfs_result['path'])}")
            print(f" TIME: ")
            print(f" - Dijkstra time: {dijkstra_result['runtime_seconds']}")
            print(f" - BFS time: {bfs_result['runtime_seconds']}")
            print(f" NODES EXPLORED: ")
            print(f" - Dijkstra time: {dijkstra_result['runtime_seconds']}")
            print(f" - BFS time: {bfs_result['runtime_seconds']}")

            return jsonify({
                "dijkstra": {
                    "start": dijkstra_result["start"],  
                    "end": dijkstra_result["end"],     
                    "runtime_seconds": dijkstra_result["runtime_seconds"],
                    "nodes_expanded": dijkstra_result["nodes_expanded"],
                    "cost": dijkstra_result["cost"],
                    "path": dijkstra_result["path"]
                },
                "bfs": {
                    "start": bfs_result["start"],
                    "end": bfs_result["end"],
                    "runtime_seconds": bfs_result["runtime_seconds"],
                    "nodes_expanded": bfs_result["nodes_expanded"],
                    "cost": bfs_result["cost"],
                    "path": bfs_result["path"]
                }
            })
        except Exception as e:
            print(f"Error processing request: {e}")
            return jsonify({"error": str(e)}), 500

# Execute 
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    app.run(host='0.0.0.0', port=port)
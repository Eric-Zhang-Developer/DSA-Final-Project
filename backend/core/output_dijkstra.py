# made by sayhan
#TOOLS
from core.load_graph import load_path
from core.Dijkstra import run_dijkstra
import json
import os  # create folders if missing, used for local run

#had to do this for local run
os.makedirs("data/results", exist_ok=True)
# Load graph
graph = load_path("data/twitter_combined.txt")
# Test case
start = "18687"
end = "40263"
# Run algorithm
result = run_dijkstra(graph, start, end)
# Save result
with open(f"data/results/dijkstra_combined_{start}_{end}.json", "w") as f:
    json.dump(result, f, indent=2)
print("Dijkstra output saved.")

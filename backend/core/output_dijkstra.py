# made by sayhan
#TOOLS
from core.load_graph import load_path
from core.Dijkstra import run_dijkstra
import json #front end

#load graph
graph = load_path("backend/data/twitter_combined.txt")
# test case
start = "18687"
end = "40263"
# run
result = run_dijkstra(graph, start, end)
# Save the result
with open(f"backend/data/results/dijkstra_combined_{start}_{end}.json", "w") as f:
    json.dump(result, f, indent=2)
print("Dijkstra output saved.")

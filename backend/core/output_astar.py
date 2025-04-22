# used sayhan algorithm but changed to be compatible with a_star  -Thomas
# 
#TOOLS
import sys
import os
import json
#import from parent folder

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from core.load_graph import load_path
from core.a_star import a_star
# Fix: go up one level from core to data/
graph = load_path("../data/twitter_combined.txt")
# test case
start = "18687"
end = "40263"
# Make sure results folder exists
os.makedirs("../data/results", exist_ok=True)
# Run
result = a_star(graph, start, end)
# Save the result one level up
with open(f"../data/results/astar_combined_{start}_{end}.json", "w") as f:
    json.dump(result, f, indent=2)
#print
print("A_star output saved")

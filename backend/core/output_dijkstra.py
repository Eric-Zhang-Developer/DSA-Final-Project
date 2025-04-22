# made by sayhan
#TOOLS
import sys
import os
import json

#import from parent folder
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from core.load_graph import load_path
from core.Dijkstra import run_dijkstra
# Fix: go up one level from core to data/
graph = load_path("../data/twitter_combined.txt")
# test case
start = "18687"
end = "40263"
# Make sure results folder exists
os.makedirs("../data/results", exist_ok=True)
# Run
result = run_dijkstra(graph, start, end)
# Save the result one level up
with open

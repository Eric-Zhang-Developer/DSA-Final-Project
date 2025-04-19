import heapq #heap priorty queue
import time
import tracemalloc
import argparse
from graph_loader import load_path  #graph loader

def heuristic(u, v):
    #A* is same as Dijkstra on unweighted graph
    return 0

def new_path(parent, current):
    path = [current]
          # backwards until reach a node with no predecessor
    while current in parent:
        current = parent[current]
        path.append(current)
    return path[::-1] # list from start node to current node

def a_star(graph, start, target):
    start_time = time.perf_counter() #tracks time
    tracemalloc.start() # to measure peak memory

    open_set = [(0, start)] 
    came_from = {}  # predecessor node
    best = {start: 0} # best from start to node currently
    f_total = {start: heuristic(start, target)} # total path
    nodes_expanded = 0 #counts expanded nodes

    #main search loop below using while loop to continue until nothing left to explore
    while open_set: 
        current_f, current = heapq.heappop(open_set) #pop lowest f score node
        nodes_expanded += 1
#if target then done with loop 
        if current == target:
            break

        for neighbor in graph.get(current, []): #explore each neighbor of node
            new_best = best[current] + 1 
            if new_best < best.get(neighbor, float('inf')):
                came_from[neighbor] = current # recording
                best[neighbor]   = new_best    # update
                f_total[neighbor]   = new_best + heuristic(neighbor, target)
                heapq.heappush(open_set, (f_total[neighbor], neighbor)) #push into the heap

    end_time = time.perf_counter() #stop timer once leaves loop
    current, peak = tracemalloc.get_traced_memory() # get the peak memory 
    tracemalloc.stop()

    # rebuild path if target was reached
    
    if target in came_from or start == target:
        path = reconstruct_path(came_from, target)
        cost = best[target]

    #or none if no path found
    else:
        path = None
        cost = None
#return performances
    
    return {'path': path, 'cost': cost, 'nodes_expanded': nodes_expanded, 'time_sec': end_time - start_time, 'mem_bytes': peak}

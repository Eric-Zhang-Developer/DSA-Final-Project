#written by Sayhan
#TOOLS
import heapq  #for shortest distance
import time  # for tracking runtime like thomas did

#MAIN FUNCTUION
#Dijkstra's on adirected graph
def run_dijkstra(graph, start, end):
    queue = [(0, start)]  #prio quem stores (cost_so_far, node)
    distance = {start: 0} #shortest distance from the start node
    parent = {} #points to the node that came before it
    seen = set()  #stores nodes we saw already
    steps = [] #list for possible frontend animation
   #this keeps going until were done with every node
    start_time = time.perf_counter()  # start timing
    while queue: 
        cost, on_this_node = heapq.heappop(queue) #current lowest cost
        if on_this_node in seen: # skip node if seen
            continue
        seen.add(on_this_node) # mark this node as seen
        #record this moment for possible frontend animation
        steps.append({
            "current": on_this_node, #the node were on
            "queue": [node for _, node in queue], #queue for next
            "visited": list(seen) #we saw already
        })
        # if we go to end, finish
        if on_this_node == end:
            break
        # get the nodes connected to eachother
        for next_to in graph.get(on_this_node, []):
            new_cost = cost + 1  #calculates possible cost to see nodes next to it, ASSUMES each edge has a weight of 1
            if next_to not in distance or new_cost < distance[next_to]: # if this path is shorter than what we had before
                distance[next_to] = new_cost # check which one has the best distance so far
                parent[next_to] = on_this_node
                heapq.heappush(queue, (new_cost, next_to)) # make sure to add to queue for nodes next toit
    #  shortest path, backwards from end
    path = []
    point = end
    while point in parent:
        path.append(point)
        point = parent[point]
    # if we made it all the way start, add start and reverse the path
    if point == start:
        path.append(start)
        path.reverse()
    else:
        #if u cant go to start its not a path
        path = []
    #FRONt end results.
    end_time = time.perf_counter() #for time 
    runtime = round(end_time - start_time, 6)
    return {
    "algorithm": "dijkstra",
    "graph": "twitter_combined.txt",
    "start": start,
    "end": end,
    "path": path,
    "cost": distance.get(end, -1),
    "visited": list(seen),
    "steps": steps,
    "nodes_expanded": len(seen), #time
    "runtime_seconds": runtime #time
}

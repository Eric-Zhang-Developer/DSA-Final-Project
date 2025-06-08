from collections import deque
import time

def bfs(graph, start, target):
    start_time = time.perf_counter()
    
    queue = deque([start])
    visited = {start}
    parent = {start: None} # For path reconstruction 
    nodes_expanded = 0

    # BFS exploration 
    while queue:
        current = queue.popleft()
        nodes_expanded += 1
        
        if current == target:
            break
            
        for neighbor in graph.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)
                parent[neighbor] = current
                queue.append(neighbor)
    
    # Reconstruct path (THE RIGHT WAY)
    path = []
    if target in parent:
        current = target
        while current is not None:
            path.append(current)
            current = parent.get(current)
        path.reverse()
    
    end_time = time.perf_counter()
    
    return {
        "algorithm": "bfs",
        "graph": "twitter_combined.txt",
        "start": start,
        "end": target,
        "path": path,
        "cost": len(path) - 1 if path else -1,
        "visited": list(visited),
        "nodes_expanded": nodes_expanded,
        "runtime_seconds": round(end_time - start_time, 6)
    }
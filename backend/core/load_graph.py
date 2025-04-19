# EGO Network is how people are connected to eachother on twitter, 
# for example, the first edges  file we have is 12831, contains a bunch of users connected to user 12831, but not 12831 themselves
    # each line has two users next to eachother like usera userb
        # this means usera is following userb
            # this is an directed edge, source ---> destanation


def load_path(path)
# Load an edge list into the adjacency list
    # load a directed graph, from the edges files
    # Make the adjasency list into a directorny

graph = {} # empty dictionary, will become  adjacency list 

with open(path, 'r') as file: # open files, and closes auto, READ ONLY mode
    for line in file: # read 1 at a time
        two_users = line.strip().split()  # gets rid of whitespace, and splits the edges files into to parts [xxxxx, xxxx]
    if len(two_users) != 2: # if there isnt 2 users skip it
                continue
        src, dst = two_users # source, destination
        if src not in graph: #if its the first time we see src, add to graph and start edge list
                graph[src] = []
            graph[src].append(dst) # our directed edge
    return graph #after reading the whole file, it makes the final adjeceny list

#now me and thomas can load edges files like
    #graph = load_path("backend/data/12831.edges")

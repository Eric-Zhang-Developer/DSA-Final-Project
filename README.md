# DSA-Final-Project - TwitterTraverse
A web application that compares Dijkstra's Algorithm and A* Algorithm for finding shortest paths between Twitter users in a social network graph.

## Overview
TwitterTraverse visualizes and benchmarks pathfinding algorithms on Twitter's social network. Enter two Twitter user IDs and see real-time performance metrics comparing how Dijkstra's and A* algorithms find connections between users.

## Appoaches to Testing: 

### 1. Direct Use
-- Warning - May take long amounts of time comparing, if comparison takes too long, refresh -- 
1. Download the file: backend/data/twitter_combined.txt
2. Search for two nodes in the file.
3. Access this website: https://twitter-traverse.vercel.app/
4. Input the two nodes and check results

### 2. Use Examples:
1. Access this website: https://twitter-traverse.vercel.app/
2. Try some of these examples: Format : User 1 -> User 2
   - 1 -> 2
   - 214328887 -> 34428380
   - 222261763 -> 222411742
   - 88097807 -> 109740608


## Setup:

### Backend

Navigate to backend directory

`cd backend`

Install dependencies

`pip install flask flask_cors`

Run the server

`python app.py`

### Frontend

Navigate to frontend directory

`cd frontend`

Install dependencies
`npm install`

Run development server

`npm run dev`

## Tech Stack
### Frontend
- React
- Next.js
- TypeScript
- TailwindCSS
- Vercel (deployment)

### Backend
- Python
- Flask
- Flask-CORS
- Render (deployment)

### Data

- Stanford SNAP Twitter dataset



## Team
Developed by ThomSayEric:

- Eric Zhang
- Sayhan Khan
- Thomas Fitzpatrick

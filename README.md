# DSA-Final-Project - TwitterTraverse
A web application that compares Dijkstra's Algorithm and Breadth-first search for finding shortest paths between Twitter users in a social network graph.

## Overview
TwitterTraverse visualizes and benchmarks path-finding algorithms on Twitter's social network. Enter two Twitter user IDs and see real-time performance metrics comparing how Dijkstra's and Breadth-first search algorithms find connections between users.

## Approaches to Testing:  


### 1. Use Examples:
1. Access this website: https://twitter-traverse.vercel.app/
2. Click the "Try Random Connection" Button (Preset random pairs)
3. Then Analyze Connection 

### 2. Direct Use
1. Download the file: backend/data/twitter_combined.txt
2. Search for two nodes in the file.
3. Access this website: https://twitter-traverse.vercel.app/
4. Input the two nodes and check results



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

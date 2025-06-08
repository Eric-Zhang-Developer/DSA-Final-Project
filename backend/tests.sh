#!/bin/bash
# test.sh - API endpoint tests

echo "Testing TwitterTraverse API..."

# Test 1: Valid connection (1 hop)
echo -e "\n 1: Testing 1-hop connection:"
curl -s http://localhost:5001/api/compare \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"start": "214328887", "end": "34428380"}' | jq '.'

# Test 2: Multi-hop connection
echo -e "\n 2: Testing multi-hop connection:"
curl -s http://localhost:5001/api/compare \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"start": "17759158", "end": "355823615"}' | jq '.'

# Test 3: No connection
echo -e "\n 3: Testing no connection:"
curl -s http://localhost:5001/api/compare \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"start": "2704495328", "end": "8163442"}' | jq '.'
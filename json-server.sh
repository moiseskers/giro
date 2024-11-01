#!/bin/bash

# Documentation: https://github.com/typicode/json-server/tree/v0

# Step 1: Kill any process currently using port 3000
PORT=3000
DELAY=1000

PID=$(lsof -t -i:$PORT)

if [ -n "$PID" ]; then
  echo "Killing process on port $PORT (PID: $PID)"
  kill -9 $PID
else
  echo "No process running on port $PORT"
fi

# Step 2: Start the json-server
echo "Starting json-server on port $PORT..."
json-server db.json --watch --routes routes.json --delay $DELAY --middlewares ./json-server.js --port $PORT
redeciclo
redeciclo@2024

## Description
Creates a simple message board API using ExpressJS.

## How to run locally
npm install
node .

## Example usage of API
Get all messages:
    curl -X GET http://localhost:3000/messages

Get a single message:
    curl -X GET http://localhost:3000/messages/0

Add message:
    curl -X POST -H 'Content-Type: application/json' -d '{ "text": "Test 1" }' http://localhost:3000/messages

Modify a message:
    curl -X PUT -H 'Content-Type: application/json' -d '{ "text": "Updated message" }' http://localhost:3000/messages/3


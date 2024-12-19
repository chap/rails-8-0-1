#!/bin/bash

# Variables
API_URL="https://rails-8-staging-92530b25997a.herokuapp.com/posts"
POST_TITLE="Sample Title"
POST_BODY="Sample Body"

# Make POST request and capture response
response=$(curl -s -w "%{http_code}" -o response.json -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{\"post\": {\"title\": \"$POST_TITLE\", \"body\": \"$POST_BODY\"}}")

# Extract HTTP status code and response body
http_status="${response: -3}"  # Last 3 characters of the response are the HTTP status code
response_body=$(cat response.json)

# Validate response
if [[ "$http_status" -eq 201 ]]; then
  title=$(echo "$response_body" | jq -r '.title')
  body=$(echo "$response_body" | jq -r '.body')

  if [[ "$title" == "$POST_TITLE" && "$body" == "$POST_BODY" ]]; then
    echo "Success: POST request was successful, and the response matches the input."
    exit 0
  else
    echo "Error: Response does not match the input."
    exit 1
  fi
else
  echo "Error: POST request failed with status code $http_status."
  exit 1
fi

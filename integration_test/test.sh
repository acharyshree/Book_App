

# Start Docker containers 
docker-compose up -d

# Run backend tests using base URL approach 
BASE_URL=http://localhost:4000/api
jest tests/**/*.test.js --coverage


# Stop Docker containers
docker-compose down

# Optionally, clean up unused containers
docker prune --force
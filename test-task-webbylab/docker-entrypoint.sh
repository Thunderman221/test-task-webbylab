API_URL=${API_URL:-http://localhost:8000/api/v1}
API_KEY=${API_KEY:-your-default-api-key}

echo "window.ENV = { 
  API_URL: '${API_URL}',
  API_KEY: '${API_KEY}'
};" > /usr/share/nginx/html/env.js


exec "$@"
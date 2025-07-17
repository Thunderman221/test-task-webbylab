# Movies App

React application for managing movies.

## Quick Start

Run the application in one command:

```bash
docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 -e API_KEY=your-api-key your_super_account/movies
```

## Configuration

The application uses environment variables for configuration:

- `API_URL` - Backend API URL (default: `http://localhost:8000/api/v1`)
- `API_KEY` - API authentication key (default: `your-default-api-key`)

## Building Docker Image

### Build locally:

```bash
docker build -t your_super_account/movies .
```

### Push to DockerHub:

```bash
docker push your_super_account/movies
```

## Running with Different API URLs

### Local development:

```bash
docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 -e API_KEY=dev-key your_super_account/movies
```

### Remote server:

```bash
docker run --name movies -p 3000:3000 -e API_URL=http://192.168.1.44:8000/api/v1 -e API_KEY=prod-key your_super_account/movies
```

### Production:

```bash
docker run --name movies -p 3000:3000 -e API_URL=https://api.example.com/v1 -e API_KEY=prod-api-key your_super_account/movies
```

## Development

### Prerequisites:

- Node.js 18+
- npm

### Local development:

```bash
npm install
npm run dev
```

### Build for production:

```bash
npm run build
```

## Using Environment Configuration in Your App

Add this to your `index.html`:

```html
<script src="/env.js"></script>
```

Then use in your JavaScript:

```javascript
const apiUrl = window.ENV?.API_URL || "http://localhost:8000/api/v1";
const apiKey = window.ENV?.API_KEY || "your-default-api-key";
```

## Docker Commands

### Stop container:

```bash
docker stop movies
```

### Remove container:

```bash
docker rm movies
```

### View logs:

```bash
docker logs movies
```

### Run in detached mode:

```bash
docker run -d --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 -e API_KEY=your-api-key your_super_account/movies
```

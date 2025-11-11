# Simple Mobile Backend API

A simple RESTful API server that you can access from your phone.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. The server will run on port 3000 by default.

## Accessing from Your Phone

### Find Your Computer's IP Address

**Linux/Mac:**
```bash
ip addr show | grep "inet " | grep -v 127.0.0.1
# or
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
```

Look for your local IP address (usually starts with 192.168.x.x or 10.x.x.x)

### Access the API

Make sure your phone is on the same WiFi network as your computer, then use:
```
http://<your-ip-address>:3000
```

For example: `http://192.168.1.100:3000`

## API Endpoints

### GET /
Returns API information and available endpoints

### GET /api/status
Returns server status and uptime

### GET /api/items
Returns all items

### GET /api/items/:id
Returns a specific item by ID

### POST /api/items
Create a new item
```json
{
  "name": "Item name",
  "description": "Item description"
}
```

### PUT /api/items/:id
Update an existing item
```json
{
  "name": "Updated name",
  "description": "Updated description"
}
```

### DELETE /api/items/:id
Delete an item by ID

## Testing from Phone

You can use apps like:
- **Postman** (iOS/Android)
- **HTTPBot** (iOS)
- **HTTP Request** (Android)
- Or simply open the browser and navigate to the URLs for GET requests

## Example Requests

```bash
# Get all items
curl http://192.168.1.100:3000/api/items

# Get status
curl http://192.168.1.100:3000/api/status

# Create new item
curl -X POST http://192.168.1.100:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"New Item","description":"Created from phone"}'
```

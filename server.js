const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple in-memory data store
let items = [
  { id: 1, name: 'Item 1', description: 'First item' },
  { id: 2, name: 'Item 2', description: 'Second item' },
  { id: 3, name: 'Item 3', description: 'Third item' }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Simple Mobile Backend API!',
    endpoints: [
      'GET / - This help message',
      'GET /api/status - Server status',
      'GET /api/items - Get all items',
      'GET /api/items/:id - Get a specific item',
      'POST /api/items - Create a new item (send JSON body with name and description)',
      'PUT /api/items/:id - Update an item',
      'DELETE /api/items/:id - Delete an item'
    ]
  });
});

// Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Get all items
app.get('/api/items', (req, res) => {
  res.json({
    success: true,
    count: items.length,
    data: items
  });
});

// Get single item
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found'
    });
  }

  res.json({
    success: true,
    data: item
  });
});

// Create new item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Name is required'
    });
  }

  const newItem = {
    id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name,
    description: description || ''
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    message: 'Item created',
    data: newItem
  });
});

// Update item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Item not found'
    });
  }

  const { name, description } = req.body;

  if (name) items[itemIndex].name = name;
  if (description !== undefined) items[itemIndex].description = description;

  res.json({
    success: true,
    message: 'Item updated',
    data: items[itemIndex]
  });
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Item not found'
    });
  }

  const deletedItem = items.splice(itemIndex, 1)[0];

  res.json({
    success: true,
    message: 'Item deleted',
    data: deletedItem
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the API at:`);
  console.log(`  - Local: http://localhost:${PORT}`);
  console.log(`  - Network: http://<your-local-ip>:${PORT}`);
  console.log(`\nTo find your local IP:`);
  console.log(`  - Linux/Mac: ifconfig or ip addr`);
  console.log(`  - Windows: ipconfig`);
});

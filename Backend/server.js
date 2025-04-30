require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware
app.use(bodyParser.json());

// Root Route
app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

// Start Server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

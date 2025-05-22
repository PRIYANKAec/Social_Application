const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/User/userRoutes'); // Import user routes
const officialRoutes = require('./routes/Official/officialRoutes');

const http = require('http');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins (for testing)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Root Route
app.get('/', (req, res) => {
  res.send('Server is running ✅');
});


//Routes
app.use('/api',userRoutes);
app.use('/api',officialRoutes);

// Start Server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

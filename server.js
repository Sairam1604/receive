const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files (like your HTML page)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to fetch IP info from IPinfo
app.use(async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const response = await axios.get(`https://ipinfo.io/${ip}?token=YOUR_TOKEN_HERE`);
    console.log('Visitor Info:', response.data); // You can store this in a DB or log file
  } catch (error) {
    console.error('Error fetching IP info:', error.message);
  }
  next();
});

// Route to serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//Configure Express 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobs');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

//print requests to console 
app.use((req, res, next) => {
  console.log(`→ ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/jobs', jobRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;


// curl -X POST http://localhost:3001/api/jobs \
//   -H "Content-Type: application/json" \
//   -d '{"wse":"WSE-001","schoolName":"Lincoln High School","qntrlId":"QNT-001","missiveId":"MIS-001","paId":"PA-001","amId":"AM-001","edd":"2025-06-01","notes":"First Test Job"}'

// curl -X GET http://localhost:3001/health \
//   -H "Content-Type: application/json" 
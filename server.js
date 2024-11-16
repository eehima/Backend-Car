// import servers
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const carRoutes = require('./routes/carRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// create server
connectDB();
const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/reviews', reviewRoutes);

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));

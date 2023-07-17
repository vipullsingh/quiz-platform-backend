// server/app.js

const express = require('express');
const mongoose = require('mongoose');
const quizRoutes = require('./routes/quizRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes

require('dotenv').config();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//home route
app.get('/',(res,req)=>{
  res.send("Welcome to quiz platform API")
})
// Routes
app.use('/api/quizzes', quizRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

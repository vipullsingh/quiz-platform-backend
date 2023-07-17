const express = require('express');
const leaderboardController = require('../controllers/leaderboardController');

const router = express.Router();

// Define leaderboard routes
router.get('/:id', leaderboardController.getLeaderboard);
router.post('/:id', leaderboardController.addLeaderboardEntry);

module.exports = router;

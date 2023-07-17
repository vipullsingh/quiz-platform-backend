// server/routes/quizRoutes.js

const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quizController');

// Quiz Routes
router.post('/', QuizController.createQuiz);
router.get('/', QuizController.getAllQuizzes);
router.get('/:id', QuizController.getQuizById);
router.put('/:id', QuizController.updateQuiz);
router.delete('/:id', QuizController.deleteQuiz);
router.post('/:id/leaderboard', QuizController.saveScore);


module.exports = router;

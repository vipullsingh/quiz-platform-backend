// server/controllers/quizController.js

const Quiz = require('../models/quizModel');

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { creator, title, description, questions } = req.body;
    const quiz = await Quiz.create({ creator, title, description, questions });
    res.status(201).json({ quiz });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json({ quizzes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve quizzes' });
  }
};

// Get a quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json({ quiz });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve quiz' });
  }
};

// Update a quiz by ID
exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, questions } = req.body;
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, { title, description, questions }, { new: true });
    if (!updatedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json({ quiz: updatedQuiz });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz' });
  }
};

// Delete a quiz by ID
exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};

exports.saveScore = async (req, res) => {
    try {
      const { id } = req.params;
      const { email, score } = req.body;
      const quiz = await Quiz.findById(id);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      quiz.leaderboard.push({ email, score });
      await quiz.save();
      res.status(200).json({ message: 'Score saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save score' });
    }
  };
  
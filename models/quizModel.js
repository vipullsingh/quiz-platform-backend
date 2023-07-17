// server/models/quizModel.js

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  answerOptions: {
    type: [String],
    required: true,
  },
  correctOptions: {
    type: [Number],
    required: true,
  },
});

const quizSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: {
    type: [questionSchema],
    required: true,
    validate: [(val) => val.length >= 2 && val.length <= 10, 'A quiz must have 2 to 10 questions.'],
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;

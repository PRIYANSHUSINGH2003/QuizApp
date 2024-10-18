// models/Quiz.js
const mongoose = require('mongoose');

// Define the schema for the Quiz model
const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    questions: [
        {
            question: {
                type: String,
                required: true,
            },
            options: {
                type: [String], // An array of strings for the options
                required: true,
            },
            answer: {
                type: String, // Correct answer
                required: true,
            },
        },
    ],
});

// Create the Quiz model from the schema
const Quiz = mongoose.model('Quiz', quizSchema);

// Export the Quiz model
module.exports = Quiz;

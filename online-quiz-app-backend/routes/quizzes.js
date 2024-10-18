const express = require('express');
const db = require('../db'); // Ensure you have a proper database connection setup
const router = express.Router();

// Add a new quiz
router.post('/', (req, res) => {
    const { title, questions } = req.body;
    const query = 'INSERT INTO quizzes (title, questions) VALUES (?, ?)';
    db.query(query, [title, JSON.stringify(questions)], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: results.insertId, title, questions });
    });
});

// Retrieve a list of available quizzes
router.get('/', (req, res) => {
    const query = 'SELECT * FROM quizzes';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Retrieve quiz by ID (Optional: if needed for frontend)
router.get('/:quizId', (req, res) => {
    const { quizId } = req.params;
    const query = 'SELECT * FROM quizzes WHERE id = ?';
    db.query(query, [quizId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]); // Return the quiz details
    });
});

// Submit quiz answers and calculate score
router.post('/:quizId/submit', (req, res) => {
    const { quizId } = req.params;
    const { answers, userName } = req.body; // answers is an array of submitted answers

    // Fetch correct answers from the database for scoring
    const query = 'SELECT questions FROM quizzes WHERE id = ?';
    db.query(query, [quizId], (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) return res.status(404).json({ error: 'Quiz not found' });

        let questions;
        try {
            questions = typeof results[0].questions === 'string' 
                ? JSON.parse(results[0].questions) 
                : results[0].questions; // Assuming it's already an object
        } catch (parseError) {
            return res.status(500).json({ error: 'Error parsing questions' });
        }

        let score = 0;

        // Calculate the score based on submitted answers
        questions.forEach((question, index) => {
            // Comparing the correct answer with the user's selected answer
            if (question.answer === answers[index]) { // Use question.answer instead of correctOption
                score++; // Increment score for each correct answer
            }
        });

        // Save the score to the results table
        const saveScoreQuery = 'INSERT INTO results (quiz_id, user_name, score) VALUES (?, ?, ?)';
        db.query(saveScoreQuery, [quizId, userName, score], (insertErr) => {
            if (insertErr) return res.status(500).json(insertErr);
            res.json({ score }); // Respond with the calculated score
        });
    });
});

module.exports = router;

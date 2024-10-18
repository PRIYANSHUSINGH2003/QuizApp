// routes/addquestion.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// POST /quizzes/:id/questions
router.post('/quizzes/:id/questions', (req, res) => {
    const quizId = req.params.id;
    const { question, options, answer } = req.body;

    const query = 'UPDATE quizzes SET questions = JSON_ARRAY_APPEND(questions, "$", ?) WHERE id = ?';
    const newQuestion = { question, options, answer };

    db.query(query, [JSON.stringify(newQuestion), quizId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error adding question', error: err });
        res.status(201).json({ message: 'Question added successfully!' });
    });
});

module.exports = router;

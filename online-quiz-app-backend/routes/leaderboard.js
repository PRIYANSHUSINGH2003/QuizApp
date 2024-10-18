// routes/leaderboard.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// Get leaderboard for a specific quiz
router.get('/:quizId', (req, res) => {
    const { quizId } = req.params;
    const query = `
        SELECT user_name, score FROM results WHERE quiz_id = ? ORDER BY score DESC LIMIT 10
    `;
    db.query(query, [quizId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

module.exports = router;

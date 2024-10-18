// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const quizzesRoutes = require('./routes/quizzes');
const leaderboardRoutes = require('./routes/leaderboard');
const addquestionRoutes = require('./routes/addquestion');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/quizzes', quizzesRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/addquestion', addquestionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

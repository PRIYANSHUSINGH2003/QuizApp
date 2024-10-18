const db = require('./db'); // Ensure this points to your db.js file

const sampleQuiz = {
    title: 'History Quiz',
    questions: JSON.stringify([
        {
            question: 'Who was the first President of the United States?',
            options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'],
            answer: 'George Washington',
        },
        {
            question: 'In which year did World War I begin?',
            options: ['1912', '1914', '1916', '1918'],
            answer: '1914',
        },
        {
            question: 'Which civilization built the pyramids?',
            options: ['Greek', 'Roman', 'Egyptian', 'Mayan'],
            answer: 'Egyptian',
        },
    ]),
};

const addSampleQuiz = () => {
    const checkQuery = 'SELECT * FROM quizzes WHERE title = ?';

    db.query(checkQuery, [sampleQuiz.title], (err, results) => {
        if (err) {
            console.error('Error checking existing quizzes:', err);
            return;
        }

        if (results.length > 0) {
            console.log('Quiz already exists. Skipping insertion.');
            db.end(); // Close the database connection
            return;
        }

        const insertQuery = 'INSERT INTO quizzes (title, questions) VALUES (?, ?)';
        db.query(insertQuery, [sampleQuiz.title, sampleQuiz.questions], (err, results) => {
            if (err) {
                console.error('Error inserting sample quiz:', err);
            } else {
                console.log('Sample quiz inserted with ID:', results.insertId);
            }
            db.end(); // Close the database connection
        });
    });
};

// Call the function to add the sample quiz
addSampleQuiz();

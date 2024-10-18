import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const Quiz = () => {
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [userName, setUserName] = useState('');
    const [nameSubmitted, setNameSubmitted] = useState(false);

    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/quizzes/${id}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleSubmitQuiz = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/quizzes/${id}/submit`, { answers, userName });
            setScore(response.data.score);
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    return (
        <View style={styles.quizContainer}>
            {!nameSubmitted ? (
                <View style={styles.nameForm}>
                    <Text style={styles.quizTitle}>Enter your name to start the quiz:</Text>
                    <TextInput
                        style={styles.nameInput}
                        value={userName}
                        onChangeText={setUserName}
                        placeholder="Your name"
                    />
                    <TouchableOpacity style={styles.startQuizButton} onPress={() => setNameSubmitted(true)}>
                        <Text style={styles.buttonText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.quizForm}>
                    {quiz?.questions.map((question, index) => (
                        <View key={index} style={styles.questionBlock}>
                            <Text style={styles.questionText}>{question.question}</Text>
                            {question.options.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={styles.optionLabel}
                                    onPress={() => {
                                        const newAnswers = [...answers];
                                        newAnswers[index] = option;
                                        setAnswers(newAnswers);
                                    }}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmitQuiz}>
                        <Text style={styles.buttonText}>Submit Quiz</Text>
                    </TouchableOpacity>
                </View>
            )}

            {submitted && <Text style={styles.scoreDisplay}>Your score: {score}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    quizContainer: {
        maxWidth: 800,
        margin: '0 auto',
        padding: 20,
        backgroundColor: '#e3f2fd',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Roboto',
    },
    quizTitle: {
        fontSize: 30,
        color: '#1e3a8a',
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: '700',
    },
    quizForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
    questionBlock: {
        backgroundColor: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 20,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        marginBottom: 15,
    },
    questionText: {
        fontSize: 20,
        color: '#4b5563',
        marginBottom: 15,
        fontWeight: '500',
    },
    optionLabel: {
        padding: 12,
        margin: 8,
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: 6,
        cursor: 'pointer',
    },
    optionText: {
        fontSize: 18,
    },
    submitButton: {
        padding: 12,
        backgroundColor: '#42a5f5',
        borderRadius: 6,
        textAlign: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    nameForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
        marginBottom: 20,
    },
    nameInput: {
        padding: 10,
        fontSize: 18,
        border: '1px solid #ddd',
        borderRadius: 5,
        width: '100%',
        maxWidth: 400,
    },
    startQuizButton: {
        width: '100%',
        maxWidth: 200,
        padding: 12,
        backgroundColor: '#42a5f5',
        borderRadius: 6,
        textAlign: 'center',
    },
    scoreDisplay: {
        marginTop: 30,
        fontSize: 24,
        color: '#4caf50',
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default Quiz;

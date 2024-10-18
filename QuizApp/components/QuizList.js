import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };
        fetchQuizzes();
    }, []);

    return (
        <View style={styles.quizListContainer}>
            <Text style={styles.quizListTitle}>Available Quizzes</Text>
            <FlatList
                data={quizzes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.quizCard}>
                        <Text style={styles.quizCardTitle}>{item.title}</Text>
                        <Text style={styles.quizCardDescription}>{item.description}</Text>
                        <TouchableOpacity
                            style={styles.startQuizButton}
                            onPress={() => navigation.navigate('Quiz', { id: item.id })}
                        >
                            <Text style={styles.startQuizButtonText}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noQuizzes}>No quizzes available</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    quizListContainer: {
        maxWidth: 1000,
        margin: 20,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        alignSelf: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    quizListTitle: {
        textAlign: 'center',
        fontSize: 28,
        color: '#333',
        marginBottom: 20,
    },
    quizCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        margin: 10,
        padding: 15,
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
        flex: 1,
    },
    quizCardTitle: {
        fontSize: 18,
        color: '#007bff',
        marginBottom: 10,
    },
    quizCardDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 15,
    },
    startQuizButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    startQuizButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    noQuizzes: {
        textAlign: 'center',
        fontSize: 18,
        color: '#555',
    },
});

export default QuizList;

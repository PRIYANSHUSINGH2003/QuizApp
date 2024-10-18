import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const route = useRoute();
    const { quizId } = route.params;

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/leaderboard/${quizId}`);
                setScores(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };
        fetchLeaderboard();
    }, [quizId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <FlatList
                data={scores}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>
                            <Text style={styles.rank}>{index + 1}.</Text> {item.user_name} - {item.score}
                        </Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noScores}>No scores available yet.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: 800,
        margin: 20,
        padding: 20,
        backgroundColor: '#f7fafc',
        borderRadius: 12,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        color: '#1a202c',
        marginBottom: 20,
        fontWeight: '700',
    },
    row: {
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        padding: 12,
    },
    cell: {
        fontSize: 16,
        color: '#4a5568',
        padding: 12,
    },
    rank: {
        fontWeight: 'bold',
        color: '#4a90e2',
    },
    noScores: {
        textAlign: 'center',
        fontSize: 18,
        color: '#718096',
        padding: 20,
    },
});

export default Leaderboard;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = ({ quizId }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigation = useNavigation();

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Online Quiz App</Text>
            <View style={styles.navContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.navButton}>Home</Text>
                </TouchableOpacity>
                {quizId && (
                    <TouchableOpacity onPress={() => navigation.navigate('Leaderboard', { quizId })}>
                        <Text style={styles.navButton}>Leaderboard</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.dropdown}>
                    <TouchableOpacity onPress={toggleDropdown}>
                        <Text style={styles.navButton}>Quizzes</Text>
                    </TouchableOpacity>
                    {isDropdownOpen && (
                        <View style={styles.dropdownContent}>
                            <TouchableOpacity onPress={() => navigation.navigate('Quiz', { id: 1 })}>
                                <Text style={styles.dropdownItem}>History Quiz</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Quiz', { id: 2 })}>
                                <Text style={styles.dropdownItem}>Science Quiz</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Quiz', { id: 3 })}>
                                <Text style={styles.dropdownItem}>Math Quiz</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <TextInput style={styles.searchInput} placeholder="Search quizzes..." />
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.navButton}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20,
        backgroundColor: '#4e54c8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    headerTitle: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Montserrat',
    },
    navContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    navButton: {
        color: '#fff',
        marginHorizontal: 10,
        padding: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 5,
        borderColor: 'transparent',
        borderWidth: 2,
        fontFamily: 'Roboto',
        textTransform: 'uppercase',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 5,
        marginLeft: 10,
        width: 200,
    },
    dropdown: {
        position: 'relative',
    },
    dropdownContent: {
        position: 'absolute',
        top: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    dropdownItem: {
        padding: 10,
        color: '#007bff',
    },
});

export default Header;

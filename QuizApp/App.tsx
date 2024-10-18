/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={QuizList} />
                <Stack.Screen name="Quiz" component={Quiz} />
                <Stack.Screen name="Leaderboard" component={Leaderboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

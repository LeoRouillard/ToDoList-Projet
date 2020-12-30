import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './Navigation';

// création de l'application par défault
export default function App() {
    return (
        // correspond au bloc de la navigation
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
}

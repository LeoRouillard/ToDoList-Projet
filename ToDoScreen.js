import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Liste } from './Liste'

// correspond à l'onglet "à faire"
// création de la partie visuelle et appel de la liste gérant les tâches
const ToDoScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold',fontSize:25, marginBottom:30}}>Tâches à faire</Text>
            <Liste check='afaire' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:35,
        padding:15,
        marginBottom:50
    },
});


export { ToDoScreen };


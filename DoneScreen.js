import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Liste } from './Liste'

// correspond à l'onglet "terminée"
// création de la partie visuelle et appel du composant Liste permettant de gérer la liste des tâches
const DoneScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold',fontSize:25, marginBottom:30}}>Tâches terminées</Text>
            <Liste check='termine' />
        </View>
    );
}

// style de l'application
const styles = StyleSheet.create({
    container: {
        marginTop:35,
        padding:15,
        marginBottom:50
    },
});

export { DoneScreen };


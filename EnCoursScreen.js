import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Liste } from './Liste'

// correspond à l'onglet "en cours"
// création de la partie visuelle et appel du composant Liste permettant de gérer la liste des tâches
const EnCoursScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold',fontSize:25, marginBottom:30}}>Tâches en cours</Text>
            <Liste check='encours' />
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

export { EnCoursScreen };


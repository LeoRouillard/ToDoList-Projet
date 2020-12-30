import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AjouterTache } from './AjouterTache';

// correspond à l'onglet "ajouter une tâche"
// création de la partie visuelle et appel du composant "AjouterTache" qui permet de gérer la partie fonctionnelle
const AjouterScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold',fontSize:25}}>Ajouter une tâche</Text>
            <AjouterTache />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:35,
        padding:15,
    },
});

export { AjouterScreen };


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

// permet d'enregistrer un objet dans la mémoire locale
const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('aabb', jsonValue)
    } catch (e) {
        console.log("Erreur storeData")
    }
}

// permet de récupérer un objet enregistré dans la mémoire locale
const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('aabb')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
        console.log("Erreur getData")
    }
}

const AjouterTache = (props) => {

    // permet de savoir quand on change d'onglet
    const isFocused = useIsFocused();

    // correspond à une tâche avec son nom, sa description et son état actuel
    const [tache, setTache] = useState({
        nom: "",
        desc: "",
        check: 'afaire'
    })

    // correspond à la liste des tâches afin de calculer l'id de la nouvelle tâche à ajouter
    const [liste, setListe] = useState([])

    // permet de mettre à jour les informations d'une tâche en fonction des informations entrées par l'utilisateur
    const handleSetTache = (cle, val) => {
        setTache({ ...tache, [cle]:val })
    }

    // permet d'ajouter une tâche à la liste des tâches
    // calcul du nouvel id en récupérant l'id du dernier élément de la liste
    // mise à jour de la liste des tâches
    // enregistrement dans la mémoire locale et les informations de la tâche remise à zéro
    const addTache = () => {
        var newId = 0;
        if (liste.length != 0) {
            newId = liste[liste.length-1].id+1;
        } else {
            newId = 0;
        }
        const object = {'id': newId, 'nom': tache.nom, 'desc': tache.desc, "check": tache.check}
        let data = [...liste, object];
        setListe(data);
        storeData(data);
        setTache({nom: "", desc: "", check: 'afaire'})
    }

    // dès lors que on change d'onglet, la liste des tâches est raffraichie
    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setListe(data);
        }
        fetchData();
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Nom de la tâche :</Text>
            <TextInput placeholder="Nom"
                       style={[styles.input]}
                       value={tache.nom}
                       onChangeText={(text) => handleSetTache('nom', text)} />
            <Text style={styles.titre}>Description de la tâche : </Text>
            <TextInput placeholder="Description"
                       style={[styles.input]}
                       value={tache.desc}
                       onChangeText={(text) => handleSetTache('desc', text)} />
            <View style={{marginBottom:30}}>
                <Text style={styles.titre}>Statut de la tâche :</Text>
                <Picker
                    selectedValue={tache.check}
                    style={{width: 150, borderWidth: 1, borderColor: 'black', borderRadius: 4}}
                    onValueChange={(itemValue, itemIndex) => handleSetTache('check', itemValue)}
                >
                   <Picker.Item label="À faire" value='afaire' />
                   <Picker.Item label="En cours" value='encours' />
                   <Picker.Item label="Terminée" value='termine' />
                </Picker>
            </View>
            <Button
                onPress={() => addTache()}
                title='Ajouter'
                color="#74b9ff"
            />
        </View>
    );
}

// permet de donner un style aux éléments de l'application
const styles = StyleSheet.create({
    container: {
        marginTop:20,
        padding:15,
    },
    titre: {
        fontSize:17
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        margin: 10,
        padding: 5,
        marginBottom:30
    },
});

export { AjouterTache };


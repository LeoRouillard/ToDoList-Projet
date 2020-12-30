import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage, TouchableOpacity, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

const Liste = (props) => {

    // correspond à la liste des tâches
    const [liste, setListe] = useState([])

    // permet de savoir quand on change d'onglet
    const isFocused = useIsFocused();

    // permet de savoir si la modal des détails des tâches est ouverte ou non
    const [modalOpen, setModalOpen] = useState(false)
    const [modalStatusOpen, setModalStatusOpen] = useState(false)

    // correspond aux informations de la tâche ouverte dans la modal
    const [itemModal, setItemModal] = useState({})

    // permet de récupérer un objet enregistré dans la mémoire locale
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('aabb')
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch(e) {
            console.log("Erreur getData")
        }
    }

    // dès lors que on change d'onglet, la liste des tâches est raffraichie
    useEffect(() => {
        getData().then(item => {
            setListe(item)
        })
    }, [isFocused]);

    // sert à supprimer une tâche de la liste des tâches et d'effectuer la modification dans la mémoire locale
    const deleteTache = (tache) => {
        const liste_tmp = [...liste]
        const index = liste_tmp.indexOf(tache)
        liste_tmp.splice(index, 1)
        setListe(liste_tmp)
        storeData(liste_tmp)
    }

    // ouverture de la modal avec les informations de la tâche en question
    const detailsTache = (item) => {
        setItemModal(item);
        setModalOpen(true);
    }

    // ouverture de la modal permettrant de modifier le status de la tâche en question
    const modalStatus = (item) => {
        setItemModal(item);
        setModalStatusOpen(true);
    }

    // fermeture de la modal correspondant au changement de status de la tâche
    const closeModalStatus = () => {
        setItemModal({});
        setModalStatusOpen(false);
    }

    // fermeture de la modal (correspond aux détails d'une tâche)
    const closeDetailsTache = () => {
        setItemModal({});
        setModalOpen(false);
    }

    // permet de changer le status d'une tâche (à faire <-> terminée) via une checkbox
    // création de la nouvelle tâche avec les mêmes informations et l'inverse de son status actuel
    // suppression de l'ancienne tâche
    // ajout de la nouvelle tâche avec le nouveau status et enregistrement dans la mémoire locale
    const changeStatus = (itemValue) => {
        const valAncienne = itemModal.check
        const liste_tmp = [...liste]
        const index = liste_tmp.indexOf(itemModal)
        var newId = 0;
        if (liste.length != 0) {
            newId = liste[liste.length-1].id+1;
        } else {
            newId = 0;
        }
        const object = {'id': newId, 'nom': itemModal.nom, 'desc': itemModal.desc, "check": itemValue}
        let data = [...liste_tmp, object];
        data.splice(index, 1)
        setListe(data)
        storeData(data)
        if (valAncienne != object.check) {setModalStatusOpen(false)}
        setItemModal(object)
    }

    return (
        <View>

            <Modal visible={modalOpen} animationType='slide' transparent={true}>
                <View style={styles.modal}>
                    <Text style={styles.titreModal}>Nom :</Text>
                    <Text style={styles.valeurModal}>{itemModal.nom}</Text>
                    <Text style={styles.titreModal}>Description :</Text>
                    <Text style={styles.valeurModal}>{itemModal.desc}</Text>
                    <Text style={styles.titreModal}>Statut :</Text>
                    { itemModal.check === 'afaire' ? <Text style={{color:'red', fontSize:17}}>À faire</Text> : itemModal.check === 'encours' ? <Text style={{color:'grey', fontSize:17}}>En cours</Text> : <Text style={{color:'green', fontSize:17}}>Terminée</Text> }
                    <TouchableOpacity
                        onPress={() => closeDetailsTache()}
                        style={styles.buttonClose}
                    >
                        <Text style={{fontSize: 17}}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


            <Modal visible={modalStatusOpen} animationType='slide' transparent={true}>
                <View style={styles.modal}>
                    <Text style={[styles.titreModal, { marginBottom: 20 }]}>Changer le statut :</Text>
                    <Picker
                        selectedValue={itemModal.check}
                        style={{width: 150}}
                         onValueChange={(itemValue, itemIndex) => changeStatus(itemValue)}
                    >
                        <Picker.Item label="À faire" value='afaire' />
                        <Picker.Item label="En cours" value='encours' />
                        <Picker.Item label="Terminée" value='termine' />
                    </Picker>
                    <TouchableOpacity
                        onPress={() => closeModalStatus()}
                        style={styles.buttonClose}
                    >
                        <Text style={{fontSize: 17}}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


            <FlatList
                data={liste}
                renderItem={({ item }) => {
                    if (item.check === props.check) {
                        return (<View style={{flexDirection:'row', borderBottomColor:"grey", marginBottom:10, borderBottomWidth: 1}}>
                            <Text style={{fontWeight:'bold', fontSize:17, flex:1}}>{item.nom}</Text>
                            <TouchableOpacity
                                style={{backgroundColor:'lightgrey', padding:5, borderRadius:5,marginBottom:10, marginLeft:10,marginRight:10}}
                                onPress={() => detailsTache(item)}>
                                <Text>Détails</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => modalStatus(item)}
                                style={{marginRight: 10, marginLeft: 5}}
                            >
                                <Ionicons name='create-outline' size={20} color='grey' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => deleteTache(item)}>
                                <Ionicons name='trash-outline' size={20} color='red' />
                            </TouchableOpacity>
                        </View>)
                    }
                }}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

// permet de donner un style aux éléments de l'application
const styles = StyleSheet.create({
    titreModal: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    valeurModal: {
        fontSize: 17,
        marginBottom: 15,
    },
    buttonClose: {
        backgroundColor: "lightgrey",
        borderRadius: 12,
        padding: 10,
        marginTop: 20,
    },
    modal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4
    },
});

export { Liste };


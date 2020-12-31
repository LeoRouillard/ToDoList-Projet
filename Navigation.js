import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ToDoScreen } from './ToDoScreen';
import { DoneScreen } from './DoneScreen';
import { AjouterScreen } from './AjouterScreen';
import { EnCoursScreen } from './EnCoursScreen';

// création du navigateur par onglets
const Tab = createBottomTabNavigator();

// création de l'ensemble des onglets avec leurs paramètres
const Navigation = (props) => {
    return (
        <Tab.Navigator initialRouteName="À faire" screenOptions={({ route }) => ({tabBarIcon: ({ focused, color, size }) => {
                                                                let iconName;
                                                                if (route.name === 'À faire') { iconName = 'ios-list'; }
                                                                else if (route.name === 'En cours') { iconName = 'ios-ellipsis-horizontal-outline'; }
                                                                else if (route.name === 'Terminée') { iconName = 'ios-checkmark-done'; }
                                                                else { iconName = 'ios-add'; }
                                                                return <Ionicons name={iconName} size={size} color={color} />;
                                                                }, })} >
            <Tab.Screen name="À faire" component={ToDoScreen} options={{ title: 'À faire' }} />
            <Tab.Screen name="En cours" component={EnCoursScreen} options={{ title: 'En cours' }} />
            <Tab.Screen name="Terminée" component={DoneScreen} options={{ title: 'Terminée' }} />
            <Tab.Screen name="Ajouter une tâche" component={AjouterScreen} options={{ title: 'Ajouter une tâche' }} />
        </Tab.Navigator>
    );
}

export { Navigation };

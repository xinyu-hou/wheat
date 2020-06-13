import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';

import Nextscreen from './components/Nextscreen'
import Homescreen from './components/Homescreen'
import VIPscreen from './components/VIPscreen';

export default function App() {
  return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName = "Wheat">
            <Stack.Screen name = "Wheat" component = {Homescreen}/>
            <Stack.Screen name = " " component = {Nextscreen}/>
            <Stack.Screen name = "delete later" component = {VIPscreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}

const Stack = createStackNavigator();

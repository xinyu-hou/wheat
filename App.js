import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';

import Nextscreen from './components/Nextscreen'
import Homescreen from './components/Homescreen'
import Splashscreen from './components/Splashscreen'

export default function App() {
  return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName = "Home">
            <Stack.Screen name = "Home" component = {Homescreen}/>
            <Stack.Screen name = " " component = {Nextscreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    // <Splashscreen/>
    )
}

const Stack = createStackNavigator();

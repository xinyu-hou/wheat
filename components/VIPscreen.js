import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import VIPHomescreen from './VIPHomescreen'
import VIPNextscreen from './VIPNextscreen';
const VIPstack = createStackNavigator();


export default class VIPscreen extends React.Component{
    render(){
        return (
            <NavigationContainer independent={true}>
                <VIPstack.Navigator initialRouteName = "Close Drawer">
                    <VIPstack.Screen name = "Close Drawer" component = {VIPHomescreen}/>
                    <VIPstack.Screen name = 'VIP Nextscreen' component = {VIPNextscreen}/>
                </VIPstack.Navigator>
            </NavigationContainer>
        )
    }
}


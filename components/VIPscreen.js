import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import VIPHomescreen from './VIPHomescreen';

const Drawer = createDrawerNavigator()

export default class VIPscreen extends React.Component{
    render(){
        return (
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name = "Close Drawer" component = {VIPHomescreen}/>
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
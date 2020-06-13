import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VIPHomescreen from './VIPHomescreen'
import VIPNextscreen from './VIPNextscreen';
import screen1 from './subcomponents/screen1';
import screen2 from './subcomponents/screen2';
import screen3 from './subcomponents/screen3';
import screen4 from './subcomponents/screen4';
import screen5 from './subcomponents/screen5';
const VIPstack = createStackNavigator();

export default class VIPscreen extends React.Component{
    render(){
        return (
            <NavigationContainer independent={true}>
                <VIPstack.Navigator initialRouteName = "Close Drawer">
                    <VIPstack.Screen name = "Close Drawer" component = {VIPHomescreen}/>
                    <VIPstack.Screen name = 'VIP Nextscreen' component = {VIPNextscreen}/>
                    <VIPstack.Screen name = 'main course' component = {screen1}/>
                    <VIPstack.Screen name = 'side dish' component = {screen2}/>
                    <VIPstack.Screen name = 'soup' component = {screen3}/>
                    <VIPstack.Screen name = 'dessert' component = {screen4}/>
                    <VIPstack.Screen name = 'beverage' component = {screen5}/>
                </VIPstack.Navigator>
            </NavigationContainer>
        )
    }
}
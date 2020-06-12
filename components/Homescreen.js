import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';

export default class Homescreen extends React.Component{
    render(){
        return(
            <View>
            <Image source = {require("../assets/food.jpg")}
                style = {styles.background}
            />
            <Text style = {styles.appName}>WHEAT</Text>
            <Text style = {styles.description}>What to eat?</Text>
            <TouchableOpacity
            style = {styles.decideButton}
            onPress = {() => this.props.navigation.navigate(' ')}>
                <Text style = {styles.decideText}>Decide!</Text>
            </TouchableOpacity> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems : "center",
    },
    appName : {
      marginTop : "5%",
      fontFamily : "Helvetica",
      fontWeight : "bold",
      fontSize : 40,
      color : "#353535",
      letterSpacing : 0,
      textAlign : "center",
    },
    description : {
      opacity : 0.5,
      fontFamily : "Helvetica",
      fontSize : 15,
      color : "#000000",
      letterSpacing : 1,
      textAlign : "center",
    },
    background : {
      width : 300,
      height : 300,
      borderRadius : 150,
      marginTop : "15%",
      marginLeft : "10%",
    },
    decideButton : {
      position : "absolute",
      marginVertical : (Dimensions.get('window').height) * 0.70,
      marginHorizontal : (Dimensions.get('window').width) * 0.30,
      alignItems : "center",
      width : 150,
      height : 40,
      backgroundColor : "orange",
      padding : 10,
    },
    decideText : {
      color : "white",
      fontSize : 15,
    },
  });
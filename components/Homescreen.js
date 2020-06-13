import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';

import * as SecureStore from 'expo-secure-store'
import Splashscreen from './Splashscreen';
import * as Facebook from 'expo-facebook';
import VIPscreen from './VIPscreen';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';

export default class Homescreen extends React.Component{

    constructor(){
      super();
      this.state = {
          loading : true,
          token : null,
      }
  }

  UNSAFE_componentWillMount(){
      setTimeout(() => {this.checkForToken()}, 7000)
  }

  async checkForToken(){
      let token = await SecureStore.getItemAsync('token')
      console.log(token)
      this.setState({
          token : token,
          loading : false,
      })
  }

  async saveTokenToSecureStorage(token){
      SecureStore.setItemAsync('token', token)
      this.setState({
          token : token,
      })
  }

    render(){
      if (this.state.loading === true){
        return (<Splashscreen/>)
      } else if (this.state.token === null){
        // return(
        //   <View>
        //   <Image source = {require("../assets/food.jpg")}
        //       style = {styles.background}
        //   />
        //   <Text style = {styles.appName}>WHEAT</Text>
        //   <Text style = {styles.description}>What to eat?</Text>
        //   <TouchableOpacity
        //   style = {styles.decideButton}
        //   onPress = {() => this.props.navigation.navigate(' ')}>
        //       <Text style = {styles.decideText}>Decide!</Text>
        //   </TouchableOpacity> 
        //   <TouchableOpacity 
        //   style = {styles.loginButton}
        //   onPress = {() => this.logIn()}
        //   >
        //     <Text style = {styles.loginText}>Try login to unlock more features</Text>
        //   </TouchableOpacity>
        //   </View>
        // )
        return (<VIPscreen/>)
      } else if (this.state.token){
        return (<VIPscreen/>)
      }
    }

    async logIn() {
      try {
            //Seed documentation on course site at mobileappdev.teachable.com
            //For default user names and passwords.
          await Facebook.initializeAsync('821914811678666');
              const {
                  type,
                  token,
                  expires,
                  permissions,
                  declinedPermissions,
              } = await Facebook.logInWithReadPermissionsAsync({
                  permissions: ['public_profile'],
              });
              if (type === 'success') {
                  // Get the user's name using Facebook's Graph API
                  const response = await fetch(
                  `https://graph.facebook.com/me?access_token=${token}`
                  );
                  this.saveTokenToSecureStorage(token)
                  Alert.alert('Logged in!', `Hello User ${(await response.json()).name}!`);
              } else {
                  // type === 'cancel'
              }
      } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
      }
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
    loginButton : {
      position : "absolute",
      marginTop : (Dimensions.get('window').height) * 0.765,
      marginLeft : (Dimensions.get('window').width) * 0.17,
    },
    loginText : {
      fontSize : 17,
      color : "orange",
    },
  });
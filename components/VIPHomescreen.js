import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default class VIPHomescreen extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => this.props.navigation.navigate('VIP Nextscreen')}
                >
                    <Text style={styles.buttonText}>Try a Random Recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button}
                // onPress 
                >
                    <Text style={styles.buttonText}>Tell Me a Joke</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: 'flex-start',
        alignItems : 'center',
        backgroundColor: 'white',
    },
    button : {
        height : 40,
        width : "95%",
        backgroundColor : "rgba(72,144,226,100)",
        justifyContent : "center",
        alignItems : "center",
        marginTop  : 10,
        borderRadius : 20,
    },
    buttonText : {
        fontFamily : "Helvetica",
        color : "white",
        fontSize : 19,
        textAlign : "center",

    },
})
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default class VIPHomescreen extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <View style = {styles.topBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Image source = {require("../assets/sidemenu_btn.png")}/>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: 'white',
    },
      topBar : {
        height : "5%",
        width : "100%",
        backgroundColor : "white",
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingHorizontal : 10,
    },
})
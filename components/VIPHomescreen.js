import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';

const fetch = require("isomorphic-fetch")
const jokeURL = "https://api.spoonacular.com/food/jokes/random"
const apiKey = "?apiKey=a135cf3998044a87a659bd51fc0db451"

export default class VIPHomescreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            joke : null,
            showCatergories : false,
            showMealTypes : false,
            tag : "",
        }
    }
    componentDidMount(){
        this.tick()
    }
    async tick(){
        let entireThing = await fetch(jokeURL + apiKey)
        let displayJSON = await entireThing.json()
        let foodJoke = displayJSON.text
        this.setState({
            joke : foodJoke,
        })
    }
    showHideCategories = () => {
        this.setState({
            showCatergories : !this.state.showCatergories
        })
    }
    showHideMealTypes = () => {
        this.setState({
            showMealTypes : !this.state.showMealTypes
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView vertical showsVerticalScrollIndicator={false} style={styles.scroll}>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => this.props.navigation.navigate('VIP Nextscreen')}
                >
                    <Text style={styles.buttonText}>Try a Random Recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button}
                onPress={() => 
                    Alert.alert('Here it is', 
                    this.state.joke, 
                    // "joke on you",
                    [{text : "cool"}, {text : "lame"}])}
                >
                    <Text style={styles.buttonText}>Tell Me a Joke</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button}
                onPress={this.showHideCategories}
                >
                    <Text style={styles.buttonText}>Pick a Category</Text>
                </TouchableOpacity>
                {this.state.showCatergories ?
                (
                    <TouchableOpacity onPress={this.showHideMealTypes}>
                        <Text style={{fontSize : 17, marginTop : 5,}}>   + Meal Types</Text>
                    </TouchableOpacity>
                )
                :
                (null)
                }
                {this.state.showMealTypes ? 
                (   
                <View>
                    <TouchableOpacity
                    onPress={()=>{
                    this.props.navigation.navigate('main course')
                    }}
                    >
                        <Text style={{fontSize : 17, marginTop : 5}}>      - main course</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>{
                    this.props.navigation.navigate('side dish')
                    }}
                    >
                        <Text style={{fontSize : 17, marginTop : 5}}>      - side dish</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity
                    onPress={()=>{
                    this.props.navigation.navigate('soup')
                    }}
                    >
                        <Text style={{fontSize : 17, marginTop : 5}}>      - soup</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity
                    onPress={()=>{
                    this.props.navigation.navigate('dessert')
                    }}
                    >
                        <Text style={{fontSize : 17, marginTop : 5}}>      - dessert</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity
                    onPress={()=>{
                    this.props.navigation.navigate('beverage')
                    }}
                    >
                        <Text style={{fontSize : 17, marginTop : 5}}>      - beverage</Text>
                    </TouchableOpacity> 
                </View>
                ) : null}
                </ScrollView>
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
        width : "100%",
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
    scroll : {
        width : "95%",
    },
})
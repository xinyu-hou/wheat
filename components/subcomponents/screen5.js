import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const fetch = require("isomorphic-fetch")
const spoonacularRandomURL = "https://api.spoonacular.com/recipes/random"
const apiKey = "?apiKey=a135cf3998044a87a659bd51fc0db451"

export default class screen5 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            foodName : null,
            imageURL : null,
            time : null,
            ingredients : null,
            steps : null,
            showIngredients : false,
            showEquipment : false,
            showIntructions : false,
        }
    }
    
    componentDidMount(){
        this.tick()
    }

    async tick(){
        let entireThing = await fetch(spoonacularRandomURL + apiKey + "&tags=beverage")
        let displayJSON = await entireThing.json()
        let name = displayJSON.recipes[0].title
        let imageLink = displayJSON.recipes[0].image
        let cookingTime = displayJSON.recipes[0].readyInMinutes
        let cookingIngredients = displayJSON.recipes[0].extendedIngredients
        let cookingSteps = displayJSON.recipes[0].analyzedInstructions[0].steps
        this.setState({
            foodName : name,
            imageURL : {uri : imageLink},
            cookingTime : cookingTime,
            ingredients : cookingIngredients,
            cookingInstruction : cookingSteps,
        })
    }

    showHideIngredients = () => {
        this.setState({
            showIngredients : !this.state.showIngredients
        }) 
    }

    showHideEquipment = () => {
        this.setState({
            showEquipment : !this.state.showEquipment
        }) 
    }

    showHideInstruction = () => {
        this.setState({
            showIntructions : !this.state.showIntructions
        }) 
    }

    showSortedEquipment(){
        var stuff = []
        var sortedStuff = ""
        this.state.cookingInstruction.map((thing)=>{
            if (thing.equipment[0] != null){
                if (stuff.includes(thing.equipment[0].name) === false){
                    stuff.push(thing.equipment[0].name)
                }
                return thing
        }})
        for (let i = 0; i < stuff.length; i++){
            sortedStuff += stuff[i] + "\n\n"
        }
        return sortedStuff
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity
                style={styles.backButton}
                onPress={() => this.props.navigation.goBack()}>
                    <Icon name="left" color="white" size={20}/>
                </TouchableOpacity>
                {/* </View> */}
                <View style={styles.topContainer}>
                    <View style={styles.topLeftContainer}>
                        <Image source={this.state.imageURL} style={styles.picture}/>
                    </View>
                    <View style={styles.topRightContainer}>
                        <Text style={styles.foodTitle}>{this.state.foodName}</Text>
                        <Icon name="clockcircleo" color='grey' size={20}/>
                        <Text style={{fontSize:15, color:"grey"}}>Ready in {this.state.cookingTime} mins</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <ScrollView vertical showsVerticalScrollIndicator={false} style={styles.scroll}>
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={this.showHideIngredients}
                            >
                                <Text>  </Text>
                                {this.state.showIngredients ? 
                                    (<Icon name="minus" color='white' size={25}/>) : 
                                    (<Icon name="plus" color='white' size={25}/>)}
                                <Text style={styles.buttonText}>Ingredients</Text>
                            </TouchableOpacity>
                            {this.state.showIngredients ? 
                            (<Text style={{fontSize:15}}>
                                {this.state.ingredients.map((thing)=>{
                                    return (thing.originalString +"\n\n")}
                                )}
                            </Text>) : null} 
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={this.showHideEquipment}
                            >
                                <Text>  </Text>
                                {this.state.showEquipment ? 
                                    (<Icon name="minus" color='white' size={25}/>) : 
                                    (<Icon name="plus" color='white' size={25}/>)}
                                <Text style={styles.buttonText}>Equipment</Text>
                            </TouchableOpacity>
                            {this.state.showEquipment ? 
                            (<Text style={{fontSize:15}}>
                                {this.showSortedEquipment()}
                            </Text>) : null}
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={this.showHideInstruction}
                            >
                                <Text>  </Text>
                                {this.state.showIntructions ? 
                                    (<Icon name="minus" color='white' size={25}/>) : 
                                    (<Icon name="plus" color='white' size={25}/>)}
                                <Text style={styles.buttonText}>Instructions</Text>
                            </TouchableOpacity>
                            {this.state.showIntructions ? 
                            (<Text style={{fontSize:15}}>
                                {this.state.cookingInstruction.map((thing)=>{
                                    return ("Step " + thing.number + ". " + thing.step + "\n\n")}
                                )}    
                            </Text>) : null}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container : {
            flex : 1,
            height : "100%",
            width : "100%",
            alignItems : "flex-start",
            backgroundColor : "white",
        },
        topContainer : {
            width : "100%",
            height : "20%",
            flexDirection : "row",
        },
        topLeftContainer : {
            height : "100%",
            width : "40%",
        },
        topRightContainer : {
            height : "100%",
            width : "60%",
        },
        picture : {
            margin : 10,
            height : 130,
            width : 130,
        },
        foodTitle : {
            marginTop : 10,
            marginRight : 10,
            fontSize : 20,
            flexShrink: 1,
            marginBottom : 3,
        },
        bottomContainer : {
            width : "100%",
            height : "70%",
            marginTop : 10,
        },
        scroll : {
            marginLeft : 10,
            marginRight : 10,
        },
        button : {
            height : 40,
            width : "100%",
            backgroundColor : "rgba(72,144,226,100)",
            justifyContent : "flex-start",
            alignItems : "center",
            marginBottom : 10,
            flexDirection : "row",
        },
        buttonText : {
            fontFamily : "Helvetica",
            color : "white",
            fontSize : 19,
            marginLeft : 5,
        },
        backButton : {
            height : 40,
            width : 40,
            backgroundColor : "rgba(72,144,226,100)",
            justifyContent : "center",
            alignItems : "center",
            borderRadius : 20,
            flexDirection : "row",
            marginTop : 5,
            marginLeft : 5,
        },
    }
)
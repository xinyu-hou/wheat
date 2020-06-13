import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const fetch = require("isomorphic-fetch")
const spoonacularRandomURL = "https://api.spoonacular.com/recipes/random"
const jokeURL = "https://api.spoonacular.com/food/jokes/random"
const apiKey = "?apiKey=a135cf3998044a87a659bd51fc0db451"

export default class Nextscreen extends React.Component{
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
        // let entireThing = await fetch(spoonacularRandomURL + apiKey)
        // let displayJSON = await entireThing.json()
        // let name = displayJSON.recipes[0].title
        // let imageLink = displayJSON.recipes[0].image
        // let cookingTime = displayJSON.recipes[0].readyInMinutes
        // let cookingIngredients = displayJSON.recipes[0].extendedIngredients
        // let cookingSteps = displayJSON.recipes[0].analyzedInstructions[0].steps
        let name = one.recipes[0].title
        let imageLink = one.recipes[0].image
        let cookingTime = one.recipes[0].readyInMinutes
        let cookingIngredients = one.recipes[0].extendedIngredients
        let cookingSteps = one.recipes[0].analyzedInstructions[0].steps
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
            // flexDirection : "column",
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
            height : "80%",
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
    }
)

const one = {"recipes":
[{"vegetarian":false,"vegan":false,"glutenFree":false,"dairyFree":false,"veryHealthy":false,"cheap":false,"veryPopular":false,"sustainable":false,"weightWatcherSmartPoints":41,"gaps":"no","lowFodmap":false,"aggregateLikes":46,"spoonacularScore":33.0,"healthScore":3.0,"creditsText":"Foodista.com 鈥� The Cooking Encyclopedia Everyone Can Edit","license":"CC BY 3.0","sourceName":"Foodista","pricePerServing":202.86,
"extendedIngredients":[{"id":18372,"aisle":"Baking","image":"white-powder.jpg","consistency":"solid","name":"baking soda","original":"2 teaspoons baking soda","originalString":"2 teaspoons baking soda","originalName":"baking soda","amount":2.0,"unit":"teaspoons","meta":[],"metaInformation":[],"measures":{"us":{"amount":2.0,"unitShort":"tsps","unitLong":"teaspoons"},"metric":{"amount":2.0,"unitShort":"tsps","unitLong":"teaspoons"}}},{"id":19903,"aisle":"Sweet Snacks","image":"dark-chocolate-pieces.jpg","consistency":"solid","name":"bittersweet chocolate","original":"4 ounces bittersweet chocolate, melted","originalString":"4 ounces bittersweet chocolate, melted","originalName":"bittersweet chocolate, melted","amount":4.0,"unit":"ounces","meta":["melted"],"metaInformation":["melted"],"measures":{"us":{"amount":4.0,"unitShort":"oz","unitLong":"ounces"},"metric":{"amount":113.398,"unitShort":"g","unitLong":"grams"}}},{"id":19334,"aisle":"Baking","image":"light-brown-sugar.jpg","consistency":"solid","name":"brown sugar","original":"1 1/2 cups brown sugar","originalString":"1 1/2 cups brown sugar","originalName":"brown sugar","amount":1.5,"unit":"cups","meta":[],"metaInformation":[],"measures":{"us":{"amount":1.5,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":354.882,"unitShort":"ml","unitLong":"milliliters"}}},{"id":1230,"aisle":"Milk, Eggs, Other Dairy","image":"buttermilk.jpg","consistency":"solid","name":"buttermilk","original":"1 cup buttermilk","originalString":"1 cup buttermilk","originalName":"buttermilk","amount":1.0,"unit":"cup","meta":[],"metaInformation":[],"measures":{"us":{"amount":1.0,"unitShort":"cup","unitLong":"cup"},"metric":{"amount":236.588,"unitShort":"ml","unitLong":"milliliters"}}},{"id":10020129,"aisle":"Baking","image":"flour.png","consistency":"solid","name":"cake flour","original":"2 1/4 cups cake flour","originalString":"2 1/4 cups cake flour","originalName":"cake flour","amount":2.25,"unit":"cups","meta":[],"metaInformation":[],"measures":{"us":{"amount":2.25,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":532.323,"unitShort":"ml","unitLong":"milliliters"}}},{"id":14209,"aisle":"Tea and Coffee","image":"brewed-coffee.jpg","consistency":"solid","name":"coffee","original":"2 tablespoons coffee","originalString":"2 tablespoons coffee","originalName":"coffee","amount":2.0,"unit":"tablespoons","meta":[],"metaInformation":[],"measures":{"us":{"amount":2.0,"unitShort":"Tbsps","unitLong":"Tbsps"},"metric":{"amount":2.0,"unitShort":"Tbsps","unitLong":"Tbsps"}}},{"id":20027,"aisle":"Baking","image":"white-powder.jpg","consistency":"solid","name":"cornstarch","original":"1/4 cup cornstarch","originalString":"1/4 cup cornstarch","originalName":"cornstarch","amount":0.25,"unit":"cup","meta":[],"metaInformation":[],"measures":{"us":{"amount":0.25,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":59.147,"unitShort":"ml","unitLong":"milliliters"}}},{"id":18373,"aisle":"Spices and Seasonings;Baking","image":"white-powder.jpg","consistency":"solid","name":"cream of tartar","original":"1/2 teaspoon cream of tartar","originalString":"1/2 teaspoon cream of tartar","originalName":"cream of tartar","amount":0.5,"unit":"teaspoon","meta":[],"metaInformation":[],"measures":{"us":{"amount":0.5,"unitShort":"tsps","unitLong":"teaspoons"},"metric":{"amount":0.5,"unitShort":"tsps","unitLong":"teaspoons"}}},{"id":1124,"aisle":"Milk, Eggs, Other Dairy","image":"egg-white.jpg","consistency":"solid","name":"egg whites","original":"3 egg whites, room temperature","originalString":"3 egg whites, room temperature","originalName":"egg whites, room temperature","amount":3.0,"unit":"","meta":["room temperature"],"metaInformation":["room temperature"],"measures":{"us":{"amount":3.0,"unitShort":"","unitLong":""},"metric":{"amount":3.0,"unitShort":"","unitLong":""}}},{"id":1125,"aisle":"Milk, Eggs, Other Dairy","image":"egg-yolk.jpg","consistency":"solid","name":"egg yolks","original":"4 egg yolks","originalString":"4 egg yolks","originalName":"egg yolks","amount":4.0,"unit":"","meta":[],"metaInformation":[],"measures":{"us":{"amount":4.0,"unitShort":"","unitLong":""},"metric":{"amount":4.0,"unitShort":"","unitLong":""}}},{"id":1123,"aisle":"Milk, Eggs, Other Dairy","image":"egg.png","consistency":"solid","name":"eggs","original":"3 eggs, room temperature","originalString":"3 eggs, room temperature","originalName":"eggs, room temperature","amount":3.0,"unit":"","meta":["room temperature"],"metaInformation":["room temperature"],"measures":{"us":{"amount":3.0,"unitShort":"","unitLong":""},"metric":{"amount":3.0,"unitShort":"","unitLong":""}}},{"id":20081,"aisle":"Baking","image":"flour.png","consistency":"solid","name":"flour","original":"1/4 cup flour","originalString":"1/4 cup flour","originalName":"flour","amount":0.25,"unit":"cup","meta":[],"metaInformation":[],"measures":{"us":{"amount":0.25,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":59.147,"unitShort":"ml","unitLong":"milliliters"}}},{"id":93829,"aisle":"Baking","image":"corn-syrup.png","consistency":"solid","name":"golden syrup","original":"1 1/2 tablespoons golden syrup","originalString":"1 1/2 tablespoons golden syrup","originalName":"golden syrup","amount":1.5,"unit":"tablespoons","meta":[],"metaInformation":[],"measures":{"us":{"amount":1.5,"unitShort":"Tbsps","unitLong":"Tbsps"},"metric":{"amount":1.5,"unitShort":"Tbsps","unitLong":"Tbsps"}}},{"id":12120,"aisle":"Baking","image":"hazelnuts.jpg","consistency":"solid","name":"hazelnuts","original":"1 cup toasted hazelnuts, chopped","originalString":"1 cup toasted hazelnuts, chopped","originalName":"toasted hazelnuts, chopped","amount":1.0,"unit":"cup","meta":["toasted","chopped"],"metaInformation":["toasted","chopped"],"measures":{"us":{"amount":1.0,"unitShort":"cup","unitLong":"cup"},"metric":{"amount":236.588,"unitShort":"ml","unitLong":"milliliters"}}},{"id":1053,"aisle":"Milk, Eggs, Other Dairy","image":"fluid-cream.jpg","consistency":"liquid","name":"heavy cream","original":"2 1/2 cups heavy cream","originalString":"2 1/2 cups heavy cream","originalName":"heavy cream","amount":2.5,"unit":"cups","meta":[],"metaInformation":[],"measures":{"us":{"amount":2.5,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":591.47,"unitShort":"ml","unitLong":"milliliters"}}},{"id":1082047,"aisle":"Spices and Seasonings","image":"salt.jpg","consistency":"solid","name":"kosher salt","original":"1 teaspoon kosher salt","originalString":"1 teaspoon kosher salt","originalName":"kosher salt","amount":1.0,"unit":"teaspoon","meta":[],"metaInformation":[],"measures":{"us":{"amount":1.0,"unitShort":"tsp","unitLong":"teaspoon"},"metric":{"amount":1.0,"unitShort":"tsp","unitLong":"teaspoon"}}},{"id":98988,"aisle":"Alcoholic Beverages","image":"light-green-liqueur.png","consistency":"solid","name":"pear liqueur","original":"1/4 cup Frangelico liqueur","originalString":"1/4 cup Frangelico liqueur","originalName":"Frangelico liqueur","amount":0.25,"unit":"cup","meta":[],"metaInformation":[],"measures":{"us":{"amount":0.25,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":59.147,"unitShort":"ml","unitLong":"milliliters"}}},{"id":19335,"aisle":"Baking","image":"sugar-in-bowl.png","consistency":"solid","name":"sugar","original":"2/3 cup sugar","originalString":"2/3 cup sugar","originalName":"sugar","amount":0.6666666666666666,"unit":"cup","meta":[],"metaInformation":[],"measures":{"us":{"amount":0.667,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":157.725,"unitShort":"ml","unitLong":"milliliters"}}},{"id":19335,"aisle":"Baking","image":"sugar-in-bowl.png","consistency":"solid","name":"sugar","original":"3/4 cup sugar","originalString":"3/4 cup sugar","originalName":"sugar","amount":0.75,"unit":"cup","meta":[],"metaInformation":[],"measures":{"us":{"amount":0.75,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":177.441,"unitShort":"ml","unitLong":"milliliters"}}},{"id":19335,"aisle":"Baking","image":"sugar-in-bowl.png","consistency":"solid","name":"sugar","original":"1 3/4 cups sugar","originalString":"1 3/4 cups sugar","originalName":"sugar","amount":1.75,"unit":"cups","meta":[],"metaInformation":[],"measures":{"us":{"amount":1.75,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":414.029,"unitShort":"ml","unitLong":"milliliters"}}},{"id":1145,"aisle":"Milk, Eggs, Other Dairy","image":"butter-sliced.jpg","consistency":"solid","name":"unsalted butter","original":"1/2 cup unsalted butter, softened","originalString":"1/2 cup unsalted butter, softened","originalName":"unsalted butter, softened","amount":0.5,"unit":"cup","meta":["unsalted","softened"],"metaInformation":["unsalted","softened"],"measures":{"us":{"amount":0.5,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":118.294,"unitShort":"ml","unitLong":"milliliters"}}},{"id":2050,"aisle":"Baking","image":"vanilla-extract.jpg","consistency":"liquid","name":"vanilla","original":"1 1/2 teaspoons vanilla","originalString":"1 1/2 teaspoons vanilla","originalName":"vanilla","amount":1.5,"unit":"teaspoons","meta":[],"metaInformation":[],"measures":{"us":{"amount":1.5,"unitShort":"tsps","unitLong":"teaspoons"},"metric":{"amount":1.5,"unitShort":"tsps","unitLong":"teaspoons"}}},{"id":2050,"aisle":"Baking","image":"vanilla-extract.jpg","consistency":"liquid","name":"vanilla","original":"2 teaspoons vanilla","originalString":"2 teaspoons vanilla","originalName":"vanilla","amount":2.0,"unit":"teaspoons","meta":[],"metaInformation":[],"measures":{"us":{"amount":2.0,"unitShort":"tsps","unitLong":"teaspoons"},"metric":{"amount":2.0,"unitShort":"tsps","unitLong":"teaspoons"}}},{"id":14412,"aisle":"Beverages","image":"water.png","consistency":"liquid","name":"water","original":"1 cup boiling water","originalString":"1 cup boiling water","originalName":"boiling water","amount":1.0,"unit":"cup","meta":["boiling"],"metaInformation":["boiling"],"measures":{"us":{"amount":1.0,"unitShort":"cup","unitLong":"cup"},"metric":{"amount":236.588,"unitShort":"ml","unitLong":"milliliters"}}},{"id":14412,"aisle":"Beverages","image":"water.png","consistency":"liquid","name":"water","original":"7 1/2 tablespoons water","originalString":"7 1/2 tablespoons water","originalName":"water","amount":7.5,"unit":"tablespoons","meta":[],"metaInformation":[],"measures":{"us":{"amount":7.5,"unitShort":"Tbsps","unitLong":"Tbsps"},"metric":{"amount":7.5,"unitShort":"Tbsps","unitLong":"Tbsps"}}}],
"id":639057,"title":"Chocolate Hazelnut Cake","readyInMinutes":45,"servings":12,"sourceUrl":"http://www.foodista.com/recipe/J37QGDPH/chocolate-hazelnut-cake","image":"https://spoonacular.com/recipeImages/639057-556x370.jpg","imageType":"jpg","summary":"Chocolate Hazelnut Cake might be just the dessert you are searching for. This recipe makes 12 servings with <b>853 calories</b>, <b>10g of protein</b>, and <b>39g of fat</b> each. For <b>$2.03 per serving</b>, this recipe <b>covers 13%</b> of your daily requirements of vitamins and minerals. 46 people have tried and liked this recipe. Head to the store and pick up frangelico liqueur, cornstarch, egg whites, and a few other things to make it today. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 37%</b>. This score is not so great. Similar recipes include <a href=\"https://spoonacular.com/recipes/chocolate-kahlua-cake-with-salted-hazelnut-chocolate-buttercream-60826\">Chocolate Kahlua Cake With Salted Hazelnut Chocolate Buttercream</a>, <a href=\"https://spoonacular.com/recipes/chocolate-hazelnut-cake-with-praline-chocolate-crunch-188727\">Chocolate Hazelnut Cake with Praline Chocolate Crunch</a>, and <a href=\"https://spoonacular.com/recipes/chocolate-hazelnut-cake-538705\">Chocolate Hazelnut Cake</a>.","cuisines":[],"dishTypes":["side dish"],"diets":[],"occasions":[],"winePairing":{},"instructions":"<ol><li>Starting with cake, cream butter and sugars until smooth. Add eggs and vanilla.</li><li>Pour into chocolate and mix well.</li><li>Sift together flour, baking soda and salt. Add dry ingredients to wet ingredients alternately with buttermilk.</li><li>Stir coffee into boiling water until combined, then pour into cake batter and stir until smooth.</li><li>Spray two 9-inch cake pans with floured baking spray. Dust with cocoa. Evenly spread cake batter between both pans.  Bang lightly on the counter to settle batter.</li><li>Bake for 30 minutes, or until tester comes out clean, in a preheated oven at 350 degrees. Let cakes cool on a rack for at least an hour.</li><li>As cakes cool, move on to hazelnut pastry cream. Pour whipping cream in a sauce pan and scald (heat just before boiling).</li><li>In a separate bowl, whisk egg yolks with sugar. Add flour and cornstarch. Whisk until smooth.</li><li>Use a ladle to scoop about a cup of the hot cream into the eggy sugar. Whisk immediately and quickly to combine.</li><li>Pour remaining cream in with eggs and keep stirring. Return warm mixture to sauce pan.</li><li>Continue to cook, whisking all the while, until thick.</li><li>Pour into a heat safe bowl and whisk in vanilla and Frangelico until smooth and creamy. Cover with plastic wrap directly touching the cream so a film will not form. Let the cream sit until its reached room temperature. Cool completely in fridge.*  Stir hazelnuts into cream once cold.</li><li>Level off both cooled cakes and slice each one in half, so there are four layers.</li><li>Lay down one cake layer and smooth about a third of the hazelnut cream on top, spreading to about 1/2 inch from edge. Repeat with next two layers and top with last layer.  Place cake in fridge to set while you make the frosting.</li><li>For the frosting, whisk all of the ingredients in a medium sized heat resistant bowl. Place bowl on top of a slightly larger pot with 1-2 inches of hot, simmering water.  (Do not let water level reach the bottom part of the bowl.)</li><li>With an electric mixer, beat egg white mixture for six minutes.  Remove from heat and continue beating for another minute while adding the vanilla.</li><li>Allow frosting to cool slightly (we put it in the fridge for about 10 minutes) before frosting cake.  Top with extra hazelnuts.</li><li>You can make the pastry cream 1-2 days ahead of time, which is exactly what we did.  Do not stir in the hazelnuts until right before you plan to use it.</li></ol>","analyzedInstructions":[{"name":"","steps":[{"number":1,"step":"Starting with cake, cream butter and sugars until smooth.","ingredients":[{"id":1053,"name":"cream","localizedName":"cream","image":"fluid-cream.jpg"}],"equipment":[]},{"number":2,"step":"Add eggs and vanilla.","ingredients":[{"id":1052050,"name":"vanilla","localizedName":"vanilla","image":"vanilla.jpg"},{"id":1123,"name":"egg","localizedName":"egg","image":"egg.png"}],"equipment":[]},{"number":3,"step":"Pour into chocolate and mix well.Sift together flour, baking soda and salt.","ingredients":[{"id":18372,"name":"baking soda","localizedName":"baking soda","image":"white-powder.jpg"},{"id":20081,"name":"all purpose flour","localizedName":"all purpose flour","image":"flour.png"},{"id":2047,"name":"salt","localizedName":"salt","image":"salt.jpg"}],"equipment":[]},{"number":4,"step":"Add dry ingredients to wet ingredients alternately with buttermilk.Stir coffee into boiling water until combined, then pour into cake batter and stir until smooth.Spray two 9-inch cake pans with floured baking spray. Dust with cocoa. Evenly spread cake batter between both pans.  Bang lightly on the counter to settle batter.","ingredients":[{"id":1230,"name":"buttermilk","localizedName":"buttermilk","image":"buttermilk.jpg"},{"id":14209,"name":"coffee","localizedName":"coffee","image":"brewed-coffee.jpg"},{"id":14412,"name":"water","localizedName":"water","image":"water.png"}],"equipment":[]},{"number":5,"step":"Bake for 30 minutes, or until tester comes out clean, in a preheated oven at 350 degrees.","ingredients":[],"equipment":[{"id":404784,"name":"oven","localizedName":"oven","image":"oven.jpg"}],"length":{"number":30,"unit":"minutes"}},{"number":6,"step":"Let cakes cool on a rack for at least an hour.As cakes cool, move on to hazelnut pastry cream.","ingredients":[{"id":12120,"name":"hazelnuts","localizedName":"hazelnuts","image":"hazelnuts.jpg"}],"equipment":[]},{"number":7,"step":"Pour whipping cream in a sauce pan and scald (heat just before boiling).In a separate bowl, whisk egg yolks with sugar.","ingredients":[{"id":1001053,"name":"whipping cream","localizedName":"whipping cream","image":"fluid-cream.jpg"},{"id":1125,"name":"egg yolk","localizedName":"egg yolk","image":"egg-yolk.jpg"},{"id":19335,"name":"sugar","localizedName":"sugar","image":"sugar-in-bowl.png"}],"equipment":[{"id":404669,"name":"sauce pan","localizedName":"sauce pan","image":"sauce-pan.jpg"},{"id":404661,"name":"whisk","localizedName":"whisk","image":"whisk.png"},{"id":404783,"name":"bowl","localizedName":"bowl","image":"bowl.jpg"}]},{"number":8,"step":"Add flour and cornstarch.","ingredients":[{"id":20027,"name":"corn starch","localizedName":"corn starch","image":"white-powder.jpg"},{"id":20081,"name":"all purpose flour","localizedName":"all purpose flour","image":"flour.png"}],"equipment":[]},{"number":9,"step":"Whisk until smooth.Use a ladle to scoop about a cup of the hot cream into the eggy sugar.","ingredients":[{"id":1053,"name":"cream","localizedName":"cream","image":"fluid-cream.jpg"},{"id":19335,"name":"sugar","localizedName":"sugar","image":"sugar-in-bowl.png"}],"equipment":[{"id":404630,"name":"ladle","localizedName":"ladle","image":"ladle.jpg"},{"id":404661,"name":"whisk","localizedName":"whisk","image":"whisk.png"}]},{"number":10,"step":"Whisk immediately and quickly to combine.","ingredients":[],"equipment":[{"id":404661,"name":"whisk","localizedName":"whisk","image":"whisk.png"}]},{"number":11,"step":"Pour remaining cream in with eggs and keep stirring. Return warm mixture to sauce pan.Continue to cook, whisking all the while, until thick.","ingredients":[{"id":1053,"name":"cream","localizedName":"cream","image":"fluid-cream.jpg"},{"id":1123,"name":"egg","localizedName":"egg","image":"egg.png"}],"equipment":[{"id":404661,"name":"whisk","localizedName":"whisk","image":"whisk.png"},{"id":404669,"name":"sauce pan","localizedName":"sauce pan","image":"sauce-pan.jpg"}]},{"number":12,"step":"Pour into a heat safe bowl and whisk in vanilla and Frangelico until smooth and creamy. Cover with plastic wrap directly touching the cream so a film will not form.","ingredients":[{"id":1052050,"name":"vanilla","localizedName":"vanilla","image":"vanilla.jpg"},{"id":1053,"name":"cream","localizedName":"cream","image":"fluid-cream.jpg"}],"equipment":[{"id":404730,"name":"plastic wrap","localizedName":"plastic wrap","image":"plastic-wrap.jpg"},{"id":404661,"name":"whisk","localizedName":"whisk","image":"whisk.png"},{"id":404783,"name":"bowl","localizedName":"bowl","image":"bowl.jpg"}]},{"number":13,"step":"Let the cream sit until its reached room temperature. Cool completely in fridge.*  Stir hazelnuts into cream once cold.Level off both cooled cakes and slice each one in half, so there are four layers.Lay down one cake layer and smooth about a third of the hazelnut cream on top, spreading to about 1/2 inch from edge. Repeat with next two layers and top with last layer.","ingredients":[{"id":12120,"name":"hazelnuts","localizedName":"hazelnuts","image":"hazelnuts.jpg"},{"id":1053,"name":"cream","localizedName":"cream","image":"fluid-cream.jpg"}],"equipment":[]},{"number":14,"step":"Place cake in fridge to set while you make the frosting.For the frosting, whisk all of the ingredients in a medium sized heat resistant bowl.","ingredients":[],"equipment":[{"id":404661,"name":"whisk","localizedName":"whisk","image":"whisk.png"},{"id":404783,"name":"bowl","localizedName":"bowl","image":"bowl.jpg"}]},{"number":15,"step":"Place bowl on top of a slightly larger pot with 1-2 inches of hot, simmering water.  (Do not let water level reach the bottom part of the bowl.)With an electric mixer, beat egg white mixture for six minutes.","ingredients":[{"id":1124,"name":"egg whites","localizedName":"egg whites","image":"egg-white.jpg"},{"id":14412,"name":"water","localizedName":"water","image":"water.png"}],"equipment":[{"id":404628,"name":"hand mixer","localizedName":"hand mixer","image":"hand-mixer.png"},{"id":404783,"name":"bowl","localizedName":"bowl","image":"bowl.jpg"},{"id":404752,"name":"pot","localizedName":"pot","image":"stock-pot.jpg"}],"length":{"number":6,"unit":"minutes"}},{"number":16,"step":"Remove from heat and continue beating for another minute while adding the vanilla.Allow frosting to cool slightly (we put it in the fridge for about 10 minutes) before frosting cake.  Top with extra hazelnuts.You can make the pastry cream 1-2 days ahead of time, which is exactly what we did.  Do not stir in the hazelnuts until right before you plan to use it.","ingredients":[{"id":12120,"name":"hazelnuts","localizedName":"hazelnuts","image":"hazelnuts.jpg"},{"id":1052050,"name":"vanilla","localizedName":"vanilla","image":"vanilla.jpg"}],"equipment":[],"length":{"number":10,"unit":"minutes"}}]}],"originalId":null,"spoonacularSourceUrl":"https://spoonacular.com/chocolate-hazelnut-cake-639057"}]}
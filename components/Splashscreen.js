import React, { useRef, useEffect, useState } from 'react';
import {View, Animated, Text, StyleSheet, Image} from 'react-native';

export default function Splashscreen(){
    const [logoOpacity, setLogoOpacity] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    logoOpacity, {
                        toValue : 1,
                        duration : 1500,
                    }
                ),
                Animated.timing(
                    logoOpacity, {
                        toValue : 0,
                        duration : 1500,
                    }
                )
            ]
        )).start()
    }, [logoOpacity])

    return(
        <View>
            <View style={styles.topContainer}>
                <Animated.View style={{opacity : logoOpacity}}>
                    <Image source={require('../assets/wheat_logo.jpg')} style={styles.logo}/>
                </Animated.View>
                <Text style={styles.slogan}>WHat to EAT today?</Text>
            </View>
            <View style={styles.creditContainer}>
                <Text style={styles.creditText}>Wheat APP logo designed by Yuelin Zhong</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topContainer : {
        height : "96%",
        width : "100%",
        backgroundColor : "white",
        alignItems : 'center',
        justifyContent : 'center',
    },
    logo : {
        height : 350,
        width : 350,
    },
    slogan : {
        marginTop : 110,
        fontSize : 30,
        fontWeight : "bold",
        letterSpacing : 1,
        textAlign : "center",
        color : "rgba(242, 213, 84, 100)",
    },
    creditContainer : {
        height : "4%",
        width : "100%",
        backgroundColor : "white",
    },
    creditText : {
        color : "grey",
        fontSize : 10,
        textAlign : "center",
    },
})
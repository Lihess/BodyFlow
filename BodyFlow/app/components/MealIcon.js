import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const mealList = [
    {
        kind : '점심',
        kcal : '500'
    },
    {
        kind : '저녁',
        kcal : '400'
    }
]

export default function MealIcon({day}){
    
    return mealList.map((meal) => {
        return (
            <View style={styles.meal}>
                <View style={styles.kcalBox}> 
                    <Text style={styles.kcal}> {meal.kcal} </Text>
                    <Text>kcal</Text>
                </View>
                <Text style={styles.kind}> {meal.kind} </Text>
            </View>
        );
    })
}   

const styles = StyleSheet.create({
    meal : {
        flex : 1,
        margin : 10
    },
    kcalBox : {
        width : 80,
        height : 80,
        backgroundColor : '#fbfdb3',
        borderRadius : '50%',
        alignItems : 'center',
        justifyContent : 'center'
    },
    kcal : {
        fontSize : 28,
        fontWeight : '800'
    },
    kind : {
        color : '#4f4f4f',
        textAlign : 'center',
        fontWeight : '600'
    }
});
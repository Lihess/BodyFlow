import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MealIcon from './MealIcon';

export default function Main() {
    return (
        <View style={styles.container}>
            <View style={styles.titleBox} >
                    <MaterialCommunityIcons size={20} name={'rice'}/>
                    <Text style={styles.title}> 식사 </Text>
                    <MaterialCommunityIcons style={{flex : 1, justifyContent:'flex-end'}} size={20} name={'pencil-outline'}/>
            </View>
            <View style={styles.contentsBox}>
                <View style={styles.meals}>
                    <MealIcon/>
                </View>
            </View>
        </View>
      );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width : '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor : "#502080",
        borderWidth : 2,
        borderRadius : 10,
        margin : 10
    },
    titleBox:{
        flex : 5,
        padding : 5,
        alignItems: 'center',
        justifyContent: 'center',
        width : '90%',
        flexDirection : 'row',
        borderBottomColor : "#f1f1f1",
        borderBottomWidth : 2
    },
    title:{
        fontSize : 16,
        fontWeight : '600',
        color : "#4f4f4f",
        justifyContent: 'flex-start',
    },
    contentsBox:{
        flex : 8,
        flexDirection : 'row'
    },
    meals : {
        flex : 1,
        flexWrap : "wrap",
        flexDirection : 'row',
        justifyContent : 'space-between'
    }
});

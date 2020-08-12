import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Weight extends React.Component{
    state = {
        weight : 105.3,
        goalCalories : 1000, 
        intakeCalories : 50,
        consumeCalories : 10
    };

    render(){
        const intakeCalories = {
            width : this.state.intakeCalories
        };

        return (
            <View style={styles.container}>
                <View style={styles.contentRight}>
                    <View style={styles.textBox}>
                        <Text style={styles.weight}>{this.state.weight}</Text>
                        <Text style={styles.unit}>kg</Text>
                    </View>
                    {/* Button 태그의 경우 마음대로 커스텀 불가! */}
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}> 입력 </Text> 
                    </TouchableOpacity>
                </View>
                    <View style={styles.contentLeft}>
                        <View style={styles.chartBar}>
                            <View style={[styles.intakeCalories, {width : this.state.intakeCalories / this.state.goalCalories * 200}]}>
                                <View style={[styles.consumeCalories, {width : this.state.consumeCalories / this.state.goalCalories * 200}]}/>
                            </View>
                        </View>
                        <View style={{flex : 1, flexDirection : 'row', justifyContent : 'space-between'}}>
                            <Text>{this.state.goalCalories > (this.state.intakeCalories - this.state.consumeCalories) ? '적정' : '과다'}</Text>
                            <View style={styles.textBox}>
                                <Text style={styles.weight}>{this.state.intakeCalories - this.state.consumeCalories}</Text>
                                <Text style={styles.unit}>/ {this.state.goalCalories}</Text>
                            </View>
                        </View>
                    </View>
            </View> 
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width : '100%',
        height : 150,
        backgroundColor: '#fff',
        borderColor : "#502080",
        borderWidth : 2,
        borderRadius : 10,
        paddingVertical : 15,
        margin : 10
    },
    contentRight : {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor : '#8d8d8d',
        borderRightWidth : 2,
    },
    contentLeft : {
        flex : 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBox : {
        flex : 1,
        flexDirection : 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    weight:{
        fontSize : 35,
        fontWeight : '800'
    },
    unit : {
        fontWeight : '500',
        color : '#8d8d8d',
        margin : 5
    },
    button : {
        marginTop : 10,
        width : 70,
        height : 30,
        backgroundColor : '#fff',
        borderColor : '#8d8d8d',
        borderWidth : 2,
        borderRadius : 50
    },
    buttonText : {
        paddingTop : 3,
        textAlign : 'center',
        fontWeight : '800',
        color : '#8d8d8d'
    },
    chartBar : {
        flex : 1,
        flexDirection : 'row',
        width : '80%',
        height : 20,
        backgroundColor : '#d6d6d6',
        borderRadius : 50,
        overflow : 'hidden'
    },
    intakeCalories : {
        flexDirection : 'row-reverse',
        backgroundColor : '#94e0f3',
        overflow : 'hidden'
    },
    consumeCalories : {
        backgroundColor : 'red'
    }
});

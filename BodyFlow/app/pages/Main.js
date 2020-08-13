import React from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import BodySize from '../components/main/BodySize.js';
import Weight from '../components/main/Weight.js';
import PatPercentage from '../components/main/FatPercentage.js';
export default class Main extends React.Component {
    state = {
        selectDay : new Date
    }

    onDayPress = (day) => {
        this.setState({
            selectDay : day
        })
        console.log(this.state.selectDay)
    }

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={'#f1f1f1'} barStyle="dark-content"/>
                <BodySize/>
                <View style={{width : '90%', flexDirection:'row', justifyContent:'space-between'}}>
                    <Weight />
                    <PatPercentage />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        padding : 10,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

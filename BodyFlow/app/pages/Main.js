import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import BodySize from '../components/main/BodySize.js';
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
                <BodySize/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

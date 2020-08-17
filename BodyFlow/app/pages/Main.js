// Main.js

import React from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import BodySize from '../components/main/BodySize.js';
import WeightAndFat from '../components/main/WeightAndFat.js';
import { common } from '../styles/Common.Style';

export default class Main extends React.Component {
    static navigationOptions = { header: null };

    render(){
        return (
            <SafeAreaView style={common.container}>
                <StatusBar backgroundColor={'#f1f1f1'} barStyle="dark-content"/>
                <BodySize/>
                <WeightAndFat/>
            </SafeAreaView>
        );
    }
}
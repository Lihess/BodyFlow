// Main.js

import React from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import BodySize from '../components/main/BodySize.js';
import WeightAndFat from '../components/main/WeightAndFat.js';
import { FatProvider } from '../components/FatContext';
import { common } from '../styles/Common.Style';

export default class Main extends React.Component {
    static navigationOptions = { headerShown: false };

    render(){
        return (
            <SafeAreaView style={common.container}>
                <StatusBar backgroundColor={'#f1f1f1'} barStyle="dark-content"/>
                {/* state를 공유하는 컴포넌트 전체를 감싸야 함!! */}
                <FatProvider>
                    <BodySize/>
                    <WeightAndFat/>
                </FatProvider>
            </SafeAreaView>
        );
    }
}
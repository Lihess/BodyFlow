
import React from 'react';
import { NavigationService } from '../router/service';
import { SafeAreaView, StyleSheet, View, Text, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { common } from '../styles/Common.Style';
import styles from '../styles/chart/Chart.style';

export default class Chart extends React.Component {
    static navigationOptions = { header: null };

    state = {
        part : this.props.navigation.state.params.part
    }

    render(){
        return (
            <SafeAreaView style={common.container}>
                <StatusBar backgroundColor={'#f1f1f1'} barStyle="dark-content"/>
                <View style={common.textBoxCenter}>
                    <Ionicons name="ios-arrow-back" size={24} color="black" onPress={() => NavigationService.back()}/>
                    <Text style={styles.title}>{this.state.part}</Text>
                </View>
            </SafeAreaView>
        );
    }
}
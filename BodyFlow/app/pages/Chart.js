
import React from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';;

export default class Chart extends React.Component {
    static navigationOptions = { header: null };

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={'#f1f1f1'} barStyle="dark-content"/>
                <Text>ggg</Text>
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

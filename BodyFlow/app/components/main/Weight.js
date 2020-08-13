import React from 'react';
import { Text, View, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import styles from '../../styles/main/WeightAndFat.Style.js';
import common from '../../styles/Common.Style.js';

export default class Weight extends React.Component{
    render(){
        return(
            <View style={styles.box}>
                <View style={[common.textbox, {alignItems : 'center'}]}>
                    <FontAwesome5 style={styles.icon} name={'weight'} size={16}/>
                    <Text style={styles.title}>체중</Text>
                </View>
                <View style={[common.textbox, styles.weightBox]}>
                    <Text style={styles.weight}>150.6</Text>
                    <Text style={styles.unit}> kg</Text>
                </View>
            </View>
        );
    }
}
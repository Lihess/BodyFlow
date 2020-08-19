// FatPercentage.js
// 체지방률을 표기를 위한 컴포넌트

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import styles from '../../styles/main/WeightAndFat.Style.js';
import {common} from '../../styles/Common.Style.js';

const FatPercentage = ({onPress, fat}) => {
    return(
        <TouchableOpacity style={styles.box} onPress={onPress}>
            <View style={common.textBoxCenter}>
                <Ionicons style={styles.icon} name={"md-body"} size={22}/>
                <Text style={styles.title}>체지방률</Text>
            </View>
            <View style={[common.textBoxEnd, styles.weightBox]}>
            <Text style={styles.weight}>{fat == null ? 0.0 : fat}</Text>
                <Text style={styles.unit}> %</Text>
            </View>
        </TouchableOpacity>
    );
}

export default FatPercentage;
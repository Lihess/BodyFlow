// WeightAndFat.js
// 체중과 체지방률 컴포넌트를 표기하고, 각 컴포넌트에 맞는 record modal를 위한 컴포넌트

import React from 'react';
import { View } from 'react-native';
import styles from '../../styles/main/WeightAndFat.Style.js';
import Weight from '../../components/main/Weight.js';
import FatPercentage from './FatPercentage.js';

const WeightAndFat = () => {
    return(
        <View style={styles.container} >
            <Weight />
            <FatPercentage /> 
        </View>
    );
}

export default WeightAndFat;
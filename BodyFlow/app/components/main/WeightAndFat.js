// WeightAndFat.js
// 체중과 체지방률 컴포넌트를 표기하고, 각 컴포넌트에 맞는 record modal를 위한 컴포넌트

import React from 'react';
import { View } from 'react-native';
import styles from '../../styles/main/WeightAndFat.Style.js';
import Weight from '../../components/main/Weight.js';
import FatPercentage from './FatPercentage.js';
import MeasurandRecord from '../modal/MeasurandRecord.js';
import FatReiremenetRecord from '../modal/FatReqiremenetRecord.js';

class WeightAndFat extends React.Component {
    state = {
        measurandVisible : false,
        requirementsVisiable : false,
        part : ''
    }

    // SizeRecordVisible 값 변경
    toggleMeasurandVisible = () => {
        this.setState({measurandVisible : !this.state.measurandVisible})
    }
    
    // requirementsVisiable 값 변경
    togglerequirementsVisiable = () => {
        this.setState({requirementsVisiable : !this.state.requirementsVisiable})
    }

    render(){
        return(
            <View style={styles.container} >
                <Weight onPress={this.toggleMeasurandVisible}/>
                <MeasurandRecord visible={this.state.measurandVisible} part={'체중'} onBackdropPress={this.toggleMeasurandVisible}/>
            
                <FatPercentage onPress={this.togglerequirementsVisiable}/>
                <FatReiremenetRecord visible={this.state.requirementsVisiable} onBackdropPress={this.togglerequirementsVisiable}/>
            </View>
        );
    }
}

export default WeightAndFat;
// WeightAndFat.js
// 체중과 체지방률 컴포넌트를 표기하고, 각 컴포넌트에 맞는 record modal를 위한 컴포넌트

import React from 'react';
import { View } from 'react-native';
import styles from '../../styles/main/WeightAndFat.Style.js';
import Weight from '../../components/main/Weight.js';
import FatPercentage from './FatPercentage.js';
import MeasurandRecord from '../modal/MeasurandRecord.js';
import FatReiremenetRecord from '../modal/FatReqiremenetRecord.js';

import { readSizeByPartsLatestWF, readSizeByPartsLatestF } from '../../backend/Read';

class WeightAndFat extends React.Component {
    state = {
        measurandVisible : false,
        requirementsVisiable : false,
        sizeParts : {'체중' : null, '체지방률' : null}
    }

    // 체중과 체지방률의 가장 최근 기록을 불러옴
    componentDidMount = () => {
        readSizeByPartsLatestWF(result => {
            this.setState({sizeParts : result})
        })
    }

    // SizeRecordVisible 값 변경
    toggleMeasurandVisible = () => {
        this.setState({measurandVisible : !this.state.measurandVisible})
    }
    
    // requirementsVisiable 값 변경
    togglerequirementsVisiable = () => {
        this.setState({requirementsVisiable : !this.state.requirementsVisiable})
    }

    onChangeSize = (part, size) => {
        const newSizeParts = this.state.sizeParts;
        newSizeParts[part] = size;

        this.setState({ sizeParts :  newSizeParts })
    }

    onChangeFat = () => {
        readSizeByPartsLatestF(result => { this.onChangeSize('체지방률', result) })
    }

    render(){
        return(
            <View style={styles.container} >
                <Weight onPress={this.toggleMeasurandVisible} weight={this.state.sizeParts['체중']}/>
                <MeasurandRecord 
                    visible={this.state.measurandVisible} 
                    part={'체중'} 
                    onBackdropPress={this.toggleMeasurandVisible}
                    onSubmit={(part, size) => this.onChangeSize(part, size)}/>
            
                <FatPercentage onPress={this.togglerequirementsVisiable} fat={this.state.sizeParts['체지방률']}/>
                <FatReiremenetRecord 
                    visible={this.state.requirementsVisiable} 
                    onBackdropPress={this.togglerequirementsVisiable}
                    onSubmit={this.onChangeFat}/>
            </View>
        );
    }
}

export default WeightAndFat;
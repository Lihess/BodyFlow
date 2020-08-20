// Weight.js
// 체중 표기를 위한 컴포넌트

import React from 'react';
import { TouchableOpacity,Text, View } from 'react-native';
import { readSizeByPartsLatestW } from '../../backend/Read';
import { FontAwesome5 } from '@expo/vector-icons'; 
import Record from '../modal/MeasurandRecord.js';
import styles from '../../styles/main/WeightAndFat.Style.js';
import { common } from '../../styles/Common.Style.js';

export default class Weight extends React.Component {
    state = {
        modalVisible : false,
        weight : null
    }

     // 체중과 체지방률의 가장 최근 기록을 불러옴
    componentDidMount = () => {
        readSizeByPartsLatestW(result => {
            this.setState({weight : result})
        })
    }

    // requirementsVisiable 값 변경
    toggleVisiable = () => {
        this.setState({modalVisible : !this.state.modalVisible})
    }
 
    // 체중 값 변경
    onChangeWeight = (newWeight) => {
        this.setState({ weight : newWeight })
    }    

    render(){
        return(
            <View style={styles.box}>
                <TouchableOpacity onPress={this.toggleVisiable}>
                    <View style={common.textBoxCenter}>
                        <FontAwesome5 style={styles.icon} name={'weight'} size={16}/>
                        <Text style={styles.title}>체중</Text>
                    </View>
                    <View style={[common.textBoxEnd, styles.sizeBox]}>
                        <Text style={[styles.size, this.state.weight == null ? common.empty : null]}>
                            {this.state.weight == null ? 0.0 : this.state.weight}
                        </Text>
                        <Text style={styles.unit}> kg</Text>
                    </View>
                </TouchableOpacity>

                <Record 
                    visible={this.state.modalVisible} 
                    part={'체중'} 
                    onBackdropPress={this.toggleVisible}
                    onSubmit={(size) => this.onChangeWeight(size)}/>
            </View>
        );
    }
}

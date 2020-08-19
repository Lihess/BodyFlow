// FatPercentage.js
// 체지방률을 표기를 위한 컴포넌트

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import FatReiremenetRecord from '../modal/FatReqiremenetRecord.js';
import { FatConsumer } from '../FatContext.js';
import styles from '../../styles/main/WeightAndFat.Style.js';
import {common} from '../../styles/Common.Style.js';

export default class FatPercentage extends React.Component {
    state = {
        modalVisible : false
    }

    // requirementsVisiable 값 변경
    toggleVisiable = () => {
        this.setState({modalVisible : !this.state.modalVisible})
    }

    render(){
        return(
            <View>
                <TouchableOpacity style={styles.box} onPress={this.toggleVisiable}>
                    <View style={common.textBoxCenter}>
                        <Ionicons style={styles.icon} name={"md-body"} size={22}/>
                        <Text style={styles.title}>체지방률</Text>
                    </View>
                    <View style={[common.textBoxEnd, styles.sizeBox]}>
                        <FatConsumer>
                            { ({fatPercent}) => 
                                <Text style={[styles.size, fatPercent == null ? styles.empty : null]}>
                                    {fatPercent == null ? 0.0 : fatPercent}
                                </Text>
                            }
                        </FatConsumer>

                        <Text style={styles.unit}> %</Text>
                    </View>
                </TouchableOpacity>

                <FatReiremenetRecord 
                    visible={this.state.modalVisible} 
                    onBackdropPress={this.toggleVisiable}/>
            </View>
        );
    }
}
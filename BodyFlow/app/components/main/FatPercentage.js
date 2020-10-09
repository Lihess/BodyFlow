// FatPercentage.js
// 체지방률을 표기를 위한 컴포넌트

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import FatReiremenetRecord from '../modal/FatReqiremenetRecord.js';
import { FatConsumer } from '../FatContext.js';
import styles from '../../styles/main/WeightAndFat.Style.js';
import {common} from '../../styles/Common.Style.js';
import { NavigationEvents } from 'react-navigation';

export default class FatPercentage extends React.Component {
    state = {
        modalVisible : false
    }

    // requirementsVisible 값 변경
    toggleVisible = () => {
        this.setState({modalVisible : !this.state.modalVisible})
    }

    render(){
        return(
            <View style={styles.box}>
                <FatConsumer>{
                    // main 화면으로 다시 넘어온 경우 데이터를 읽어옴.
                    ({setFatPercent}) => <NavigationEvents onDidFocus={setFatPercent}/>
                }</FatConsumer>

                <TouchableOpacity onPress={this.toggleVisible}>
                    <View style={common.textBoxCenter}>
                        <Ionicons style={styles.icon} name={"md-body"} size={22}/>
                        <Text style={styles.title}>체지방률</Text>
                    </View>
                    <View style={[common.textBoxEnd, styles.sizeBox]}>
                        <FatConsumer>
                            { ({fatPercent}) => 
                                <Text style={[styles.size, !fatPercent ? common.empty : null]}>
                                    {!fatPercent ? 0.0 : fatPercent}
                                </Text>
                            }
                        </FatConsumer>

                        <Text style={styles.unit}> %</Text>
                    </View>
                </TouchableOpacity>

                <FatReiremenetRecord 
                    visible={this.state.modalVisible} 
                    onBackdropPress={this.toggleVisible}/>
            </View>
        );
    }
}
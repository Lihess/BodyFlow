// measurandRecord.js
// 측정량 기입을 위한 입력 modal. 아래에 측정 팁도 함께 표기
// 색상은 후에 생각해보기

import React from 'react';
import Modal from 'react-native-modal';
// https://github.com/react-native-community/react-native-modal
import { TouchableOpacity, View, TextInput, Text } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { AntDesign } from '@expo/vector-icons'; 
import common from '../../styles/Common.Style';
import styles from '../../styles/record/MeasurandRecord.Style';

export default class MeasurandRecord extends React.Component {
    state = {
        visible : false,
        unit : 'cm',
        decimalInformation : false, // 소수점 관련 안내문구의 표기 여부
        rangeInformation : false, // 입력범위 관련 안내문구의 표기 여부
        measurand : '',
        foucsColor : '#c4c4c4'
    } 

    // props 값이 변경된 경우 state 값 변경
    // componentWillRecivedProps 에서 getDerivedStateFromProps로 변경됨.
    // 안에는 this 사용 불가. 변경할 state가 있다면 객체 형태로 반환
    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(nextProps.visible != prevState.visible) 
            return { visible : nextProps.visible };
        else return null;
    }

    // Modal이 열려있을때만 실행되는 함수
    closedModal = () => {
        if (this.state.visible) { 
            this.props.onBackdropPress()
            this.setState({
                visible : false,
                unit : 'cm',
                decimalInformation : false,
                rangeInformation : false,
                measurand : '',
                foucsColor : '#c4c4c4'
            })
        }
    }

    // 단위 선택 시, 해당 단위로 state 값 변경
    onSelectUnit = (value) => {
        value == 0 ? this.setState({unit : 'cm'}) : this.setState({unit : 'in'});
    }

    // 입력된 값의 범위는 2.0 ~ 300.0 만 허용하기 위한 함수
    checkRange = (text) => {
        console.log(text);
        if (text === '0' || (text < 2 && text.length > 1)) {
            this.setState({ rangeInformation : true })
            return '2.0';
        }
        else if (text > 300) {
            this.setState({ rangeInformation : true })
            return '300.0';
        }
        else {
            this.setState({ rangeInformation : false })    
            return text;
        } 
    }

    // text가 입력될때 정해진 정규 표현식의 입력만 받기 위한 함수
    onChangeText = (text) => {
        // 소수점 둘째자리까지의 숫자만 입력가능.
        if (/^(\d+)\.{0,1}\d{0,2}$/.test(text) || text === ''){
            text = this.checkRange(text);

            this.setState({
                measurand : text,
                decimalInformation : false,
            });
        }
        // 소수점 둘째자리 이상 입력하면 안내문구나 출력되도록
        else if (/^(\d+)\.\d\d\d$/.test(text)){
            this.setState({ decimalInformation : true });
        }
    }

    onFocusInput = () => {
        this.setState({
            foucsColor : "orange"
        })
    }

    onBlurInput = () => {
        this.setState({
            foucsColor : '#c4c4c4'
        })
    }

    render(){
        return(
            <Modal 
            style={styles.background}
            isVisible={this.state.visible}
            onBackdropPress={this.closedModal} 
            onBackButtonPress={this.closedModal}
            backdropColor={'#1f1f1f'}>

                <View style={styles.box}>
                    <View style={[common.textbox, {alignItems : 'center'}]}>
                        <Text style={styles.title}> {this.props.part} </Text>
                        <AntDesign name="linechart" size={24} color="black" />
                    </View>
                    <View>
                        <View style={[styles.inputBox, {borderColor : this.state.foucsColor}]}>
                            { this.props.part != '체중' ?
                                <SwitchSelector 
                                    style={[styles.switch, {borderColor : this.state.foucsColor}]}
                                    options={[
                                        {label : 'cm', value : '0'},
                                        {label : 'inch', value : '1'}
                                    ]} 
                                    initial={0} 
                                    buttonColor={this.state.foucsColor}
                                    borderRadius={0}
                                    height={30}
                                    alignItems={'center'}
                                    textStyle={styles.switchFont}
                                    selectedTextStyle={styles.switchFont}
                                    animationDuration={50}
                                    onPress={value => this.onSelectUnit(value)} /> : null
                            }
                            <TextInput 
                                style={styles.input} 
                                keyboardType={'numeric'}
                                placeholder={'0.0'}
                                value={this.state.measurand}
                                onChangeText={(text) => this.onChangeText(text)}
                                onFocus={this.onFocusInput}
                                onBlur={this.onBlurInput}/>
                        </View>   
                        {
                            this.state.decimalInformation ?
                                <Text style={styles.information}> 소수점 이하 2자리까지만 입력하세요. </Text> : null
                        }{
                            this.state.rangeInformation ?
                                <Text style={styles.information}> 2.0 ~ 300.0 사이 값만 입력하세요. </Text> : null
                        }
                        <Text style={{width:200, height:200, textAlign : 'center', textAlignVertical : 'center'}}>팁이 들어갈자리. 이미지 만들면 넣자</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

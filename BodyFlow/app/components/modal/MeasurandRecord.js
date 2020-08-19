// measurandRecord.js
// 측정량 기입을 위한 입력 modal. 아래에 측정 팁도 함께 표기
// 합칠 수 있으면 합치기.
// 색상은 후에 생각해보기

import React from 'react';
import Modal from 'react-native-modal';
// https://github.com/react-native-community/react-native-modal
import { NavigationService } from '../../router/service';
import { TouchableOpacity, View, TextInput, Text } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { common, modal } from '../../styles/Common.Style.js';
import styles from '../../styles/modal/MeasurandRecord.Style.js';
import CalendarModal from './CalenderModal.js';
import { createSizeByPart } from '../../backend/Create';
import { FatConsumer } from '../FatContext';

export default class MeasurandRecord extends React.Component {
    state = {
        visible : false,
        calenderVisible : false,
        day : getToday(),
        unit : 'cm',
        decimalInformation : false, // 소수점 관련 안내문구의 표기 여부
        rangeInformation : false, // 입력범위 관련 안내문구의 표기 여부
        size : '',
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
                calenderVisible : false,
                day : getToday(),
                unit : 'cm',
                decimalInformation : false,
                rangeInformation : false,
                size : '',
                foucsColor : '#c4c4c4'
            })
        }
    }

    // Chart 페이지로 이동
    onPressIcon = () => {
        this.closedModal()
        NavigationService.navigate('ChartPage', {part : this.props.part})
    }

    // 날짜 재지정을 위한 캘린더 modal open / close
    toggleCalenderVisible = () => {
        this.setState({ calenderVisible : !this.state.calenderVisible })
    }

    // 단위 선택 시, 해당 단위로 state 값 변경
    onSelectUnit = (value) => {
        value == 0 ? this.setState({unit : 'cm'}) : this.setState({unit : 'in'});
    }

    // 입력된 값의 범위는 2.0 ~ 300.0 만 허용하기 위한 함수
    checkRange = (text) => {
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
                size : text,
                decimalInformation : false,
            });
        }
        // 소수점 둘째자리 초과 입력하면 안내문구나 출력되도록
        else if (/^(\d+)\.\d\d\d$/.test(text)){
            this.setState({ decimalInformation : true });
        }
    }

    // 입력 시 색상 변경 이벤트
    onFocusInput = () => {
        this.setState({
            foucsColor : "orange"
        })
    }

    // 입력 시 색상 변경 이벤트
    onBlurInput = () => {
        this.setState({
            foucsColor : '#c4c4c4'
        })
    }

    onSubmit = () => {
        // 입력된 정보를 DB에 저장
        createSizeByPart(this.state.day, this.props.part, this.state.size);
        
        this.props.onSubmit(this.props.part, this.state.size)
        this.closedModal();
    }

    // 선택 날짜로 재지정
    selectDay = (selectDay) => {
        if (selectDay == null) {
            this.setState({ day : getToday() })
        }
        else
            this.setState({ day : selectDay })
    }

    render(){
        return(
            <Modal 
            style={modal.background}
            isVisible={this.state.visible}
            onBackdropPress={this.closedModal} 
            onBackButtonPress={this.closedModal}
            backdropColor={'#1f1f1f'}>

           
                <View style={modal.box}>
                    <View style={styles.titleBox}>
                        <View style={common.textBoxCenter}>
                            <Text style={modal.title}> {this.props.part} </Text>
                            <MaterialCommunityIcons name="chart-bar" size={27} color={'orange'} onPress={this.onPressIcon}/>
                        </View>
                        {/* 날짜를 클릭하면 캘린더가 나와서 원하는 날짜를 지정할 수 있도록. */}
                        <Text style={styles.day} onPress={this.toggleCalenderVisible}>
                            {this.state.day.replace(/\-/g, '.')}
                        </Text>
                    </View>
                    
                    <View style={[styles.inputBox, {borderColor : this.state.foucsColor}]}>
                        { this.props.part != '체중' ?
                            <SwitchSelector 
                                style={{borderColor : this.state.foucsColor}}
                                options={[
                                    {label : 'cm', value : '0'},
                                    {label : 'inch', value : '1'}
                                ]} 
                                initial={0} 
                                backgroundColor={'#e4e4e4'}
                                buttonColor={'white'}
                                borderRadius={0}
                                height={30}
                                alignItems={'center'}
                                textStyle={styles.switchFont}
                                selectedTextStyle={styles.switchSelect}
                                animationDuration={50}
                                onPress={value => this.onSelectUnit(value)} /> : null
                        }
                        <TextInput 
                            style={styles.input} 
                            keyboardType={'numeric'}
                            placeholder={'0.0'}
                            value={this.state.size}
                            onChangeText={(text) => this.onChangeText(text)}
                            onFocus={this.onFocusInput}
                            onBlur={this.onBlurInput}/>
                    </View> 
                    
                    {
                        this.state.decimalInformation ?
                            <Text style={modal.information}> 소수점 이하 2자리까지만 입력하세요. </Text> : null
                    }{
                        this.state.rangeInformation ?
                            <Text style={modal.information}> 2.0 ~ 300.0 사이 값만 입력하세요. </Text> : null
                    }
                    <Text style={{width:200, height:200, textAlign : 'center', textAlignVertical : 'center'}}>팁이 들어갈자리. 이미지 만들면 넣자</Text>
                    <View style={{ alignItems : 'flex-end'}}>
                        {
                            this.props.part != '허리' ?
                                <TouchableOpacity style={modal.submit} onPress={this.onSubmit}> 
                                    <Text style={modal.submitText}>완료</Text>    
                                </TouchableOpacity>
                                : <FatConsumer>
                                    {
                                        ({setFatPercentW}) => 
                                        <TouchableOpacity style={modal.submit} onPress={() => {this.onSubmit(); setFatPercentW(this.state.size)}}> 
                                            <Text style={modal.submitText}>완료</Text>    
                                        </TouchableOpacity>
                                    }
                                </FatConsumer>
                            }      
                    </View>
                </View>

                { /* 날짜 선택시 해당 modal이 보이도록! */ }
                <CalendarModal visible={this.state.calenderVisible} onBackdropPress={this.toggleCalenderVisible} onSubmit={(day) => this.selectDay(day)}/> 
            </Modal>
        );
    }
}

// 오늘 날짜를 형식에 맞추어 포맷팅하여 반환하는 함수
const getToday = () => {
    const today = new Date();

    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
   
    return year + (month > 8 ? '-' : '-0') + month + (day > 9 ? '-' : '-0') + day;
}

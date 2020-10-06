// FatReqirementRecord.js
// 측정량 기입을 위한 입력 modal. 아래에 측정 팁도 함께 표기
// 색상은 후에 생각해보기

import React from 'react';
import Modal from 'react-native-modal';
// https://github.com/react-native-community/react-native-modal
import { NavigationService } from '../../router/service';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { common, modal } from '../../styles/Common.Style';
import { styles, table } from '../../styles/modal/FatReqiremenetRecord.Style';
import { createUserInfo } from '../../backend/Create';
import { FatConsumer } from '../FatContext';

export default class FatReqirementRecord extends React.Component {
    fatPercent = [
        ['< 20%', '< 15%'],
        ['20 - 25%', '15 - 20%'],
        ['25 - 30%', '20 - 25%'],
        ['30% >', '25% >']
    ]
    
    state = {
        visible : false,
        decimalInformation : false,
        rangeInformation : false,
        gender : null,
        height : '',
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
                decimalInformation : false,
                rangeInformation : false,
                gender : null,
                height : '',
                foucsColor : '#c4c4c4'
            })
        }
    }

    // Chart 페이지로 이동
    onPressIcon = () => {
        this.closedModal()
        NavigationService.navigate('ChartPage', {part : '체지방률'})
    }

    // 선택한 성별로 state 값 변경
    onPressButton = (gender) => {
        this.setState({ gender : gender })
    }

    // 입력된 값의 범위는 10.0 ~ 250.0 만 허용하기 위한 함수
    checkRange = (text) => {
        if (text === '0' || (text < 10 && text.length > 1)) {
            this.setState({ rangeInformation : true })
            return '10.0';
        }
        else if (text > 250) {
            this.setState({ rangeInformation : true })
            return '250.0';
        }
        else {
            this.setState({ rangeInformation : false })    
            return text;
        } 
    }

    // text가 입력될때 정해진 정규 표현식의 입력만 받기 위한 함수
    onChangeText = (text) => {
        // 소수점 첫째자리까지의 숫자만 입력가능.
        if (/^(\d+)\.{0,1}\d{0,1}$/.test(text) || text === ''){
            text = this.checkRange(text);

            this.setState({
                height : text,
                decimalInformation : false,
            });
        }
        // 소수점 둘째자리 이상 입력하면 안내문구나 출력되도록
        else if (/^(\d+)\.\d\d$/.test(text)){
            this.setState({ decimalInformation : true });
        }
    }

    // 글자 기입시 색 변경을 위해
    onFocusInput = () => { 
        this.setState({
            foucsColor : "orange"
        })
    }

    // 글자 기입시 색 변경을 위해
    onBlurInput = () => {
        this.setState({
            foucsColor : '#c4c4c4'
        })
    }

    // DB에 정보 저장
    onSubmit = () => {
        // 값을 입력한 경우에만 저장
        this.state.height && this.state.gender ? createUserInfo(this.state.height, this.state.gender) : null;
        this.closedModal();
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
                        <Text style={modal.title}> 체지방률 </Text>
                        <MaterialCommunityIcons name="chart-bar" size={27} color={'#FF824A'} onPress={this.onPressIcon}/>
                    </View>
                    <View style={ styles.inputBox}>
                        {/* 성별 입력란 */}
                        <View style={[common.textBoxCenter, {marginBottom : 5}]}>
                            <Text style={styles.inputBoxInText}>성별</Text>

                            <TouchableOpacity 
                                style={[styles.genderButton, this.state.gender == 'M' ? styles.genderSelect : null]}
                                onPress={() => this.onPressButton('M')}> 
                                <Text style={[styles.genderButtonText, this.state.gender == 'M' ? { color : 'white' } : null]}>
                                    남자
                                </Text> 
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.genderButton, this.state.gender == 'F' ? styles.genderSelect : null]} 
                                onPress={() => this.onPressButton('F')}> 
                                <Text style={[styles.genderButtonText, this.state.gender == 'F' ? { color : 'white' } : null]}>
                                    여자
                                </Text> 
                            </TouchableOpacity>
                        </View>

                        {/* 키 입력란, 안내문구 */}
                        <View style={common.textBoxEnd}>
                            <Text style={styles.inputBoxInText}>키</Text>
                            <TextInput 
                                style={[styles.input, {borderBottomColor : this.state.foucsColor}]} 
                                keyboardType={'numeric'}
                                placeholder={'0.0'}
                                value={String(this.state.height)}
                                onChangeText={(text) => this.onChangeText(text)}
                                onFocus={this.onFocusInput}
                                onBlur={this.onBlurInput}/>
                            <Text style={styles.inputBoxInText}> cm</Text>
                        </View>
                    </View>
                    {
                        this.state.decimalInformation ?
                            <Text style={modal.information}> 소수점 이하 1자리까지만 입력하세요. </Text> : null
                    }{
                        this.state.rangeInformation ?
                            <Text style={modal.information}> 10.0 ~ 250.0 사이 값만 입력하세요. </Text> : null
                    }
                    
                    
                    <View style={styles.tipBox}>
                        <Text style={styles.tableTitle}>* 체지방률 범위</Text>
                        <Table borderStyle={table.border} style={table.container} >
                            <Row data={[null, '여성', '남성']} flexArr={[1, 1, 1]} style={table.header} textStyle={table.text}/>
                            <TableWrapper style={common.textBoxCenter}>
                                <Col data={['마름','보통','경도비만','비만']} style={table.title} textStyle={table.text}/>
                                <Rows style={table.rows} flexArr={[1, 1]} data={this.fatPercent} textStyle={table.percentText}/>
                            </TableWrapper>
                        </Table>
                        <Text style={styles.tipContent}>
                            {'본 앱에서는 키와 허리둘레를 기반으로 한\nRFM(Relative Fat Mess) 공식을 이용하여\n체지방률을 계산합니다.'}
                        </Text>
                    </View>

                    <View style={{ alignItems : 'flex-end'}}>
                        <FatConsumer>
                            {({setFatPercentHG}) => 
                                <TouchableOpacity style={modal.submit} onPress={() => {this.onSubmit(); setFatPercentHG(this.state.height, this.state.gender)}}> 
                                    <Text style={modal.submitText}>완료</Text>    
                                </TouchableOpacity>
                            }
                        </FatConsumer>
                        
                    </View>
                </View>
            </Modal>
        );
    }
}

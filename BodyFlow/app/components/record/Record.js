import React from 'react';
import Modal from 'react-native-modal';
// https://github.com/react-native-community/react-native-modal
import { TouchableOpacity, View, TextInput, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import common from '../../styles/Common.Style';
import styles from '../../styles/record/Record.Style';

export default class Record extends React.Component {
    state = {
        visible : false,
        decimalInformation : false,
        rangeInformation : false,
        size : null
    } 

    // props 값이 변경된 경우 state 값 변경
    // componentWillRecivedProps 에서 getDerivedStateFromProps로 변경됨.
    // 안에는 this 사용 불가. 변경할 state가 있다면 객체 형태로 반환
    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(nextProps.visible != prevState.visible) 
            return { visible : nextProps.visible };
        else return null;
    }

    // Modal이 열려있을때만 실행
    closedModal = () => {
        if (this.state.visible) { 
            this.props.onBackdropPress()
            this.setState({
                visible : false,
                size : null
            })
        }
    }

    // 입력된 값의 범위는 2.0 ~ 300.0 만 허용
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

    onChangeText = (text) => {
        // 소수점 둘째자리까지의 숫자만 입력가능.
        if (/^(\d+)\.{0,1}\d{0,2}$/.test(text) || text === ''){
            text = this.checkRange(text);

            this.setState({
                size: text,
                decimalInformation : false
            });
        }
        // 소수점 둘째자리 이상 입력하면 안내문구나 출력되도록
        else if (/^(\d+)\.\d\d\d$/.test(text)){
            this.setState({ decimalInformation : true });
        }
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
                    <View style={common.textbox}>
                        <Text> cc </Text>
                        <AntDesign name="linechart" size={24} color="black" />
                    </View>
                    <View>
                        <TextInput 
                            style={styles.input} 
                            keyboardType = 'numeric'
                            placeholder={'0.0'}
                            value={this.state.size}
                            onChangeText={(text) => this.onChangeText(text)}/>
                        {
                            this.state.decimalInformation ?
                                <Text> 소수점 이하 2자리까지만 입력할 수 있습니다. </Text> : null
                        }
                        {
                            this.state.rangeInformation ?
                                <Text> 2.0 ~ 300.0 사이 값만 입력하세요. </Text> : null
                        }
                    </View>
                </View>
            </Modal>
        );
    }
}

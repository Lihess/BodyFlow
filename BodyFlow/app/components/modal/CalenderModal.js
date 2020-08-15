import React from 'react';
import Modal from 'react-native-modal';
import { TouchableOpacity, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
// https://www.npmjs.com/package/react-native-calendars
import { common, modal } from '../../styles/Common.Style.js';

export default class CalendarModal extends React.Component{
    state = {
        visible : false,
        day : new Date()
    } 

    // props 값이 변경된 경우 state 값 변경
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
                day : new Date()
            })
        }
    }

    onDayPress = (day) => {
        console.log(day);
        this.setState( {
            day : day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
        } )
        console.log(this.state.day);
    }

    render(){
        return (
            <Modal 
                style={modal.background}
                isVisible={this.state.visible}
                onBackdropPress={this.closedModal} 
                onBackButtonPress={this.closedModal}
                backdropColor={'#1f1f1f'}>

                <Calendar onDayPress={(day) => this.onDayPress}/>
                <View style={{ alignItems : 'flex-end'}}>
                    <TouchableOpacity style={modal.submit} onPress={this.onSubmit}> 
                        <Text style={modal.submitText}>완료</Text>    
                    </TouchableOpacity>
                </View>
            </Modal>
            
        );
    }
}
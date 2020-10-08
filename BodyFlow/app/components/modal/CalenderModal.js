import React from 'react';
import Modal from 'react-native-modal';
import { TouchableOpacity, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
// https://www.npmjs.com/package/react-native-calendars
import {  modal } from '../../styles/Common.Style.js';
import styles from '../../styles/modal/CalenderModal.Style.js';
import getToday from '../GetToday'

export default class CalendarModal extends React.Component{
    state = {
        visible : false,
        selectDate : this.props.selectDate,
        disableArrowRight : true
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
                visible : false
            })
        }
    }

    onDayPress = (selectDate) => {
        this.setState({ selectDate : selectDate.dateString })
    }

    onSubmit = () => {
        if (!this.state.selectDate){
            this.props.onSubmit(null);
        }
        else {
            // 외부에서 보이는 날짜 포맷은 'yyyy.MM.dd'이므로 변경!
            this.props.onSubmit(this.state.selectDate);
        }
        this.closedModal()
    }

    renderHeader = (date) => {
        const today = getToday()

        if ( (date.getFullYear() == today.substring(0,4)) && (date.getMonth() + 1 == today.substring(5,7))) 
            this.setState( { disableArrowRight : true } )
        else this.setState( { disableArrowRight : false } )

        return (
            <Text style={styles.header}> 
                {date.getFullYear() + (date.getMonth() > 8 ? '.' : '.0') + (date.getMonth() + 1)} 
            </Text>
        );
    }

    render(){
        return (
            <Modal 
                style={modal.background}
                isVisible={this.state.visible}
                onBackdropPress={this.closedModal} 
                onBackButtonPress={this.closedModal}
                backdropColor={'#1f1f1f'}>

                <View style={modal.box}>
                    <View style={styles.calenderBox}>
                    <Calendar 
                        maxDate={getToday()}
                        style={styles.calender}
                        theme={{
                            selectedDayBackgroundColor: '#FF824A',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#FF2601',
                            arrowColor: '#FF824A',
                        }}
                        disableArrowRight={this.state.disableArrowRight}
                        onDayPress={(day) => this.onDayPress(day)} 
                        markedDates={{[this.state.selectDate] : {selected: true}}}
                        renderHeader={(date) => this.renderHeader(date)}/>
                    </View>
                    
                    <View style={{ alignItems : 'flex-end'}}>
                        <TouchableOpacity style={modal.submit} onPress={this.onSubmit}> 
                            <Text style={modal.submitText}>완료</Text>    
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}
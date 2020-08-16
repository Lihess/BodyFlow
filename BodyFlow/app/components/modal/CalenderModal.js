import React from 'react';
import Modal from 'react-native-modal';
import { TouchableOpacity, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
// https://www.npmjs.com/package/react-native-calendars
import { common, modal } from '../../styles/Common.Style.js';
import styles from '../../styles/modal/CalenderModal.Style.js';

export default class CalendarModal extends React.Component{
    state = {
        visible : false,
        day : null
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
                day : null
            })
        }
    }

    onDayPress = (selectDay) => {
        this.setState( {
            day : selectDay.dateString
        })
    }

    onSubmit = () => {
        if (this.state.day === null){
            this.props.onSubmit(null);
        }
        else {
            // 외부에서 보이는 날짜 포맷은 'yyyy.MM.dd'이므로 변경!
            this.props.onSubmit(this.state.day.replace(/-/g, '.'));
        }
        this.closedModal()
    }

    renderHeader = (date) => {
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
                    style={styles.calender}
                        theme={{
                            selectedDayBackgroundColor: 'orange',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: 'orange',
                            arrowColor: 'orange',
                        }}
                        onDayPress={(day) => this.onDayPress(day)} 
                        markedDates={{[this.state.day] : {selected: true}}}
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
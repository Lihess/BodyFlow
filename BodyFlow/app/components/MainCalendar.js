import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// https://github.com/wix/react-native-calendars
import moment from 'moment'

// 메인화면의 달력 컴포넌트
export default class MainCalendar extends React.Component {
    state = {
        selectDay : moment(this.props.selectDay).subtract(1, 'days').format('YYYY-MM-DD')// 선택된 날짜에 따로 스타일을 부여하기 위함
    };

    onDayPress = (day) => {
        this.props.onDayPress(day); // 메인에 선택한 날짜를 돌려주기 위함

        this.setState({
            selectDay : moment(day).subtract(1, 'months').format('YYYY-MM-DD')
        }); // 바로 화면이 다시 보여지게 하기위해서 state 값 변경
    }

    render(){
        return (
            <View style={styles.container}>
                <CalendarList 
                    horizontal={true} 
                    pagingEnabled={true} 
                    calendarWidth={Dimensions.get('window').width * 0.9} 
                    onDayPress={(day) => this.onDayPress(day)} // 날짜를 선택하면 메인에 해당 날짜를 전송하고 state 값 변경
                    markedDates={{
                        [this.state.selectDay] : {selected: true, marked: true, selectedColor: 'blue'},
                    }}/> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width : '100%',
        height : '300',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : 'white',
        borderColor : 'black',
        borderRadius : 10,
        borderWidth : 2,
        overflow : 'hidden',
        padding : 10
    },
    calendar : {
        margin : 20,
        width : '80%',
        margin : 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

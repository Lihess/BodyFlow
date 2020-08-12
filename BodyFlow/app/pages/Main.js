import React from 'react';
import { withRouter } from 'react-router-dom';
import { SafeAreaView ,ScrollView ,StyleSheet, Text, View } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainCalendar from '../components/MainCalendar.js';
import Box from '../components/Box.js';
import WeightAndGoal from '../components/WeightAndGoal.js';
import Meal from '../components/Meal.js';

export default class Main extends React.Component {
    state = {
        selectDay : new Date
    }

    onDayPress = (day) => {
        this.setState({
            selectDay : day
        })
        console.log(this.state.selectDay)
    }

    

    render(){
        return (

                <View style={styles.container}>
                    <MainCalendar selectDay={this.state.selectDay} onDayPress={this.onDayPress}/>
                    <WeightAndGoal name={''}/>
                    <Meal name={'식사'}/>
                    <Box name={'운동'}/>
                    <Box name={'메모'}/>
                </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

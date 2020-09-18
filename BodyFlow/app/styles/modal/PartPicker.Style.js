import {StyleSheet} from 'react-native';
import {normalize} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    partBox : {
        padding : 10,
        backgroundColor : '#e4e4e4',
        borderBottomColor : '#c4c4c4',
        borderBottomWidth : 1
    },
    partBoxLast : {
        padding : 10,
        backgroundColor : '#e4e4e4'
    },
    selectPartBox : {
        backgroundColor : 'white'
    },
    partFont : {
        color : '#b4b4b4',
        fontSize : normalize(13),
        fontWeight : '700',
        textAlign : 'center'
    },
    selectPart : {
        padding : 2,
        color : 'black',
        fontSize : normalize(16),
    }
});

export default styles;
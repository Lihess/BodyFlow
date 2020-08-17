import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

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
        fontSize : screenWidth > 400 ? normalize(12) : normalize(15),
        fontWeight : '700',
        textAlign : 'center'
    },
    selectPart : {
        padding : 2,
        color : 'black',
        fontSize : screenWidth > 400 ? normalize(15) : normalize(18),
    }
});

export default styles;
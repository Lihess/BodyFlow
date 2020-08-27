import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    box : {
        width : '100%',
        padding : 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
    },
    bottomLine : {
        borderBottomColor : '#c4c4c4',
        borderBottomWidth : 1,
    },
    date : {
        fontSize : screenWidth > 400 ? normalize(12) : normalize(15),
        fontWeight : '700'
    },
    size : {
        fontSize : screenWidth > 400 ? normalize(18) : normalize(20),
        fontWeight : '700'
    },
    unit : {
        color : '#848484',
        fontWeight : '700'
    }
})

export default styles
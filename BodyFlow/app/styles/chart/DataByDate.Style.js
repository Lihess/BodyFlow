import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    box : {
        width : '100%',
        paddingVertical : 10,
        paddingHorizontal : 15,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
    },
    bottomLine : {
        borderBottomColor : '#e4e4e4',
        borderBottomWidth : 1,
    },
    date : {
        fontSize : screenWidth > 400 ? normalize(12) : normalize(15),
        fontWeight : '700',
    },
    sizeBox : {
        marginLeft : 60,
        flexDirection : 'row',
        alignItems : 'flex-end',
        justifyContent : 'flex-end'
    },
    size : {
        fontSize : screenWidth > 400 ? normalize(20) : normalize(22),
        fontWeight : '700'
    },
    unit : {
        color : '#848484',
        fontWeight : '700'
    },
    variance : {
        width : '15%',
        color : '#848484',
        fontSize : screenWidth > 400 ? normalize(12) : normalize(15),
        fontWeight : '700',
        textAlign : 'right'  
    }
})

export default styles
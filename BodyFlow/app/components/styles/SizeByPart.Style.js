import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from './ResponsiveFontSize.js'

const styles = StyleSheet.create({
    box : {
        width : '90%',
        padding : 5,
        margin : 5,
        borderRadius : 10,
        borderColor : '#c4c4c4',
        borderWidth : 1
    },
    smallText : {
        fontSize : screenWidth > 400 ? normalize(10) : normalize(12),
        fontWeight : '700',
        color : '#848484'
    },
    size : {
        fontSize : screenWidth > 400 ? normalize(14) : normalize(16),
        fontWeight : '700',
    }
});

export default styles;
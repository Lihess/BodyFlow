import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    calenderBox : {
        padding : 5,
        marginBottom : 10,
        overflow : 'hidden'
    },
    calender : {
        marginTop : -5,
        height: 340,
        marginBottom : 20,
    },
    header : {
        fontSize : normalize(18),
        fontWeight : '700'
    }
});

export default styles;
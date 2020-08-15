// MeasurandRecord.Style.js

import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    inputBox : {
        marginTop : 25,
        borderRadius : 10,
        borderWidth : 1,
        overflow : 'hidden'
    },
    switch : {
        width : '100%',
        borderBottomWidth : 1
    },
    switchFont : {
        fontWeight : '700',
        fontSize : screenWidth > 400 ? normalize(12) : normalize(14)
    },
    input : {
        paddingVertical : 15,
        fontSize : screenWidth > 400 ? normalize(27) : normalize(30),
        fontWeight : '800',
        textAlign : 'center'
    }
});

export default styles;
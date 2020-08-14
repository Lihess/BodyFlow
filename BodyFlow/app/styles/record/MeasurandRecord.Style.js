// MeasurandRecord.Style.js

import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    background : {
        flex : 1,
        alignItems : 'center',
        justifyContent :  'center'
    },
    box : {
        width : "85%",
        padding : 15,
        backgroundColor : 'white',
        borderRadius : 10
    },
    input : {
        fontSize : screenWidth > 400 ? normalize(25) : normalize(27),
        fontWeight : '800',
        textAlign : 'center'
    }
});

export default styles;
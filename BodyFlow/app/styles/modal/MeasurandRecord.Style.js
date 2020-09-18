// MeasurandRecord.Style.js

import {StyleSheet} from 'react-native';
import {normalize} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    titleBox : {
        flexDirection : 'row',
        alignItems : 'flex-end',
        justifyContent : 'space-between'
    },
    day : {
        color : 'orange',
        fontSize : normalize(13),
        fontWeight : '700',
    },
    inputBox : {
        marginTop : 25,
        borderRadius : 10,
        borderWidth : 1,
        overflow : 'hidden'
    },
    switchFont : {
        color : '#b4b4b4',
        fontWeight : '700',
        fontSize : normalize(13)
    },
    switchSelect : {
        color : 'orange',
        fontWeight : '700',
        fontSize : normalize(13)
    },
    input : {
        paddingVertical : 15,
        fontSize : normalize(27),
        fontWeight : '800',
        textAlign : 'center'
    }
});

export default styles;
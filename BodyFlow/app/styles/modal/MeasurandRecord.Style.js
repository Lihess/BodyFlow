// MeasurandRecord.Style.js

import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    titleBox : {
        flexDirection : 'row',
        alignItems : 'flex-end',
        justifyContent : 'space-between'
    },
    day : {
        color : 'orange',
        fontSize : screenWidth > 400 ? normalize(12) : normalize(15),
        fontWeight : '700',
    },
    inputBox : {
        marginTop : 25,
        borderRadius : 10,
        borderWidth : 1,
        overflow : 'hidden'
    },
    switch : {
        width : '100%',
        backgroundColor : '#c4c4c4',
    },
    switchFont : {
        color : '#b4b4b4',
        fontWeight : '700',
        fontSize : screenWidth > 400 ? normalize(13) : normalize(15)
    },
    input : {
        paddingVertical : 15,
        fontSize : screenWidth > 400 ? normalize(27) : normalize(30),
        fontWeight : '800',
        textAlign : 'center'
    }
});

export default styles;
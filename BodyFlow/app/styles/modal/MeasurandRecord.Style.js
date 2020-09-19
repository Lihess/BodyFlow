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
    },
    tipBox : {
        padding : 15,
        marginVertical : 10,
        backgroundColor : '#f0f0f0',
        borderRadius : 10,
        alignItems : 'center'
    },
    tipImage : {
        marginBottom : 10,
        width : screenWidth * 0.5,
        height : screenWidth * 0.38
    }, 
    tipContent : {
        textAlign : 'center',
        fontWeight : '700'
    }
});

export default styles;
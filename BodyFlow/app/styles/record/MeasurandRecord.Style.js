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
    title : {
        fontSize : screenWidth > 400 ? normalize(18) : normalize(20),
        fontWeight : '700',
        marginRight : 5
    },
    inputBox : {
        marginTop : 15,
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
    },
    information : {
        color : "orange",
        fontWeight : '700',
        textAlign : 'right'
    }
});

export default styles;
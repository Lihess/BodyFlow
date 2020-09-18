// MeasurandRecord.Style.js

import {StyleSheet} from 'react-native';
import {normalize} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    titleBox : {
        flexDirection : 'row',
        alignItems : 'flex-end',
        justifyContent : 'center'
    },
    inputBox : {
        padding : 15,
        marginTop : 25,
        borderColor : '#c4c4c4',
        borderRadius : 10,
        borderWidth : 1,
    },
    input : {
        marginRight : 5,
        width : '30%',
        fontWeight : '700',
        fontSize : normalize(13),
        textAlign : "center",
        borderBottomWidth : 1,
    },
    inputBoxInText : {
        marginRight : 5,
        width : '25%',
        fontWeight : '700',
        fontSize : normalize(13)
    },
    genderButton : {
        width : '20%',
        padding : 4,
        marginRight : 8,
        borderColor : '#c4c4c4',
        borderWidth : 1,
        borderRadius : 5
    },
    genderSelect : {
        backgroundColor : 'orange',
        borderColor : 'orange',
    },
    genderButtonText : {
        fontSize :  normalize(11),
        textAlign : 'center',
        fontWeight : '700'
    }
});

export default styles;
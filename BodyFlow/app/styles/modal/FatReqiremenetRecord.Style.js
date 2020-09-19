// MeasurandRecord.Style.js

import {StyleSheet} from 'react-native';
import {normalize,screenWidth} from '../ResponsiveFontSize.js'

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
    },
    tipBox : {
        marginVertical : 10,
        backgroundColor : '#f0f0f0',
        borderRadius : 10,
    },
    tableTitle : {
        marginTop : 15,
        marginLeft : 10,
        marginBottom : 5,
        fontSize : normalize(13),
        fontWeight : '700'
    },
    tipContent : {
        marginVertical : 15,
        textAlign : 'center',
        fontWeight : '700'
    }
});

const table =  StyleSheet.create({
    border : {
        borderWidth: 2,
        borderColor: '#c4c4c4'
    },
    container : {
        marginBottom : 5,
        marginHorizontal : 10,
        backgroundColor : 'white'
    },
    header : {
        height : 28,
        backgroundColor: '#e5e5e5'
    },
    title : {
        flex: 1, backgroundColor: '#e5e5e5'
    },
    rows : {
        height: 28
    },
    text : {
        color : '#545454',
        textAlign : 'center',
        fontWeight : '700'
    },
    percentText : {
        fontSize : normalize(13),
        textAlign : 'center',
        fontWeight : '700'
    }
})


export {styles, table};
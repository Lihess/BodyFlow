// BodySize.Style.js

import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    container: {
        flex : 5,
        flexDirection : 'row',
        width : '90%',
        padding : 15,
        paddingBottom : 25,
        backgroundColor : 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius : 10,
        overflow : 'hidden'
    },
    imageBox : {
        width: "65%",
        marginRight : 15
    },
    imageBackground : {
        width: "100%",
        height: "100%"
    },
    bodyImage : {
        flex : 1,
        width: "100%",
    },
    sizesBox : {
        width:'30%',
        justifyContent : 'center',
    },
    switch : {
        width : '90%',
        borderRadius : 7,
        borderColor : '#c4c4c4',
        borderWidth : 1,
        padding : 3,
        margin : 5,
        overflow : 'hidden'
    },
    switchFont : {
        fontWeight : '700',
        fontSize : screenWidth > 400 ? normalize(12) : normalize(14)
    }
});

export default styles;
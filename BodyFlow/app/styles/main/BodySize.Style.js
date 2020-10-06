// BodySize.Style.js

import {StyleSheet} from 'react-native';
import {normalize} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    container: {
        flexDirection : 'row',
        width : '95%',
        padding : 15,
        paddingBottom : 35,
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
        margin : 5,
        overflow : 'hidden'
    },
    switchFont : {
        color : '#b4b4b4',
        fontWeight : '700',
        fontSize : normalize(13)
    },
    selectedFont : {
        color : 'white',
        fontWeight : '700',
        fontSize : normalize(14),
      
    }
});

export default styles;
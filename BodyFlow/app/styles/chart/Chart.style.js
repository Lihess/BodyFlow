import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    partBox : {
        width : '90%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },
    part : {
        marginRight : 8,
        fontSize : screenWidth > 400 ? normalize(20) : normalize(20),
        fontWeight : '700',
        textAlign : 'center'
    },
    switchBox : {
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 20
    },
    switch : {
        width : '30%',
        padding : 3,
        margin : 5,
        overflow : 'hidden'
    },
    switchFont : {
        color : '#b4b4b4',
        fontWeight : '700',
        fontSize : screenWidth > 400 ? normalize(12) : normalize(14)
    },
    switchSelect : {
        color : 'black',
        fontWeight : '700',
        fontSize : screenWidth > 400 ? normalize(13) : normalize(15)
    },
    dataBox : {
        width : '100%',
        marginTop : 20,
        backgroundColor : 'white',
        borderColor : '#c4c4c4',
        borderWidth : 1,
        borderRadius : 10,
        overflow : 'hidden',
        zIndex : 2
    }
})

export default styles
import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    titleBox : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        width : '90%'
    },
    title : {
        marginRight : 8,
        fontSize : screenWidth > 400 ? normalize(20) : normalize(20),
        fontWeight : '700',
        textAlign : 'center'
    },
    selectorBox : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
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
})

export default styles
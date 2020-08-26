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
    }
})

export default styles
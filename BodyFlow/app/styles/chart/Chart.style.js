import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    title : {
        width : '90%',
        fontSize : screenWidth > 400 ? normalize(20) : normalize(20),
        fontWeight : '700',
        textAlign : 'center'
    }
})

export default styles
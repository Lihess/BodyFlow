import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: 'black',
        justifyContent : 'center'
    },
    xIcon : {
        position : "absolute",
        top : 10,
        left : 10,
    },
    photo : {
        width : screenWidth,
        height : screenWidth
    }
})

export default styles;
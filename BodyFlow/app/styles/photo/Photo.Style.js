import {StyleSheet} from 'react-native';
import { screenWidth, screenHeight } from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: 'black',
        justifyContent : 'center'
    },
    iconBox : {
        position : "absolute",
        top : 0,
        left : 0,
        width : screenWidth,
        height : 45,
        backgroundColor : 'rgba(0,0,0,0.5)',
        zIndex : 2
    },
    xIcon : {
        position : "absolute",
        top : 10,
        left : 10,
        zIndex : 2
    },
    trashIcon : {
        position : "absolute",
        top : 10,
        right : 10,
        zIndex : 2
    },
    photo : {
        width : screenWidth,
        height : screenHeight,
        resizeMode : "contain"
    }
})

export default styles;
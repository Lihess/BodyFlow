import {StyleSheet} from 'react-native';
import { screenWidth, screenHeight, normalize } from '../ResponsiveFontSize.js'

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
    },
    confirmation : {
        paddingVertical : 45,
        fontSize : normalize(15),
        fontWeight : '700',
        textAlign : 'center'  
    },
    modalBox : {
        width : "85%",
        backgroundColor : 'white',
        borderRadius : 8,
        overflow : 'hidden',
        // https://ethercreative.github.io/react-native-shadow-generator/
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    buttonBox : {
        padding : 10,
        flexDirection : 'row',
        alignContent : 'flex-end',
        justifyContent : 'flex-end',
        backgroundColor : '#e4e4e4'
    },
    button : {
        paddingVertical : 3,
        paddingHorizontal : 20,
        marginLeft : 8,
        borderRadius : 5
    },
    cancel : {
        backgroundColor : '#d4d4d4',
        borderColor : '#c4c4c4',
        borderWidth : 1
    },
    confirm : {
        backgroundColor : 'orange'
    },
    buttonText : {
        fontSize : normalize(13)
    },
    confirmText : {
        color : 'white'
    }
})

export default styles;
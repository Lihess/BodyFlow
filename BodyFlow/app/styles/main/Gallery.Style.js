import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    container: {
        flex : 5,
        width : '90%',
        padding : 15,
        paddingBottom : 25,
        backgroundColor : 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius : 10,
        overflow : 'hidden'
    },
    placeholder : {
        color : '#848484',
        fontSize : normalize(15),
        fontWeight : '700',
    },
    button : {
        position : "absolute",
        bottom : 25,
        right : 20,
        padding : 8,
        paddingTop : 6,
        paddingLeft : 6,
        borderRadius : 10,
        backgroundColor : 'orange',
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

export default styles;
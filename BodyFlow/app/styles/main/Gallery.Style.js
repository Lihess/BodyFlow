import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    container: {
        flex : 5,
        width : '95%',
        padding : 15,
        paddingBottom : 25,
        backgroundColor : 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius : 10,
        overflow : 'hidden'
    },
    dateByPhotos : {
        width : screenWidth,
        marginBottom : 20,
        alignItems : 'flex-start',
        justifyContent : 'flex-start'
    },
    photoBox : {
        paddingLeft : 15,
        flexDirection : 'row',
    },
    date : {
        marginBottom : 5,
        fontSize : normalize(15),
        fontWeight : '700',
        textAlign : 'left'
    },
    photoButton : {
        width : (screenWidth * 0.24),
        height : (screenWidth * 0.24),
        marginRight : 5,
        backgroundColor : '#c4c4c4',
        borderColor : '#c4c4c4',
        borderWidth : 1,
        overflow : 'hidden'
    },
    photo : {
        width : '100%',
        height : '100%'
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
        backgroundColor : '#FF824A',
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
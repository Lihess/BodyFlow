import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from './ResponsiveFontSize.js'

const common = StyleSheet.create({
    textBox : {
        flexDirection : 'row',
        alignItems : 'flex-end'
    }
});

const modal = StyleSheet.create({
    background : {
        flex : 1,
        alignItems : 'center',
        justifyContent :  'center'
    },
    box : {
        width : "85%",
        padding : 15,
        backgroundColor : 'white',
        borderRadius : 10
    },
    titleBox : {
        flexDirection : 'row',
        alignItems : 'flex-end',
        justifyContent : 'space-between'
    },
    title : {
        fontSize : screenWidth > 400 ? normalize(18) : normalize(20),
        fontWeight : '700',
        marginRight : 5
    },
    day : {
        color : 'orange',
        fontSize : screenWidth > 400 ? normalize(12) : normalize(15),
        fontWeight : '700',
    },
    information : {
        color : "orange",
        fontWeight : '700',
        textAlign : 'right'
    },
    submit : {
        width : '40%',
        padding : 5,
        borderRadius : 10,
        backgroundColor : 'orange'
    },
    submitText : {
        color : 'white',
        fontSize : screenWidth > 400 ? normalize(12) : normalize(15),
        fontWeight : '700',
        textAlign : 'center'
    }
})

export {common, modal};
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
        alignItems : 'center',
        justifyContent : 'center'
    },
    title : {
        fontSize : screenWidth > 400 ? normalize(18) : normalize(20),
        fontWeight : '700',
        marginRight : 5
    },
    information : {
        color : "orange",
        fontWeight : '700',
        textAlign : 'right'
    }
})

export {common, modal};
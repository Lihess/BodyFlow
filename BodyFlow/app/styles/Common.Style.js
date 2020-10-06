import {StyleSheet} from 'react-native';
import {normalize } from './ResponsiveFontSize.js'

const common = StyleSheet.create({
    container: {
        flex : 1,
        padding : 10,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textBoxEnd : {
        flexDirection : 'row',
        alignItems : 'flex-end'
    },
    textBoxCenter : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    empty : {
        color : '#c4c4c4'
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
        borderRadius : 8,
        overflow : 'hidden',
        // https://ethercreative.github.io/react-native-shadow-generator/
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    title : {
        marginRight : 2,
        fontSize : normalize(18),
        fontWeight : '700'
    },
    information : {
        color : '#FF824A',
        fontWeight : '700',
        textAlign : 'right'
    },
    submit : {
        width : '100%',
        padding : 5,
        borderRadius : 5,
        backgroundColor : '#FF824A'
    },
    submitText : {
        color : 'white',
        fontSize : normalize(13),
        fontWeight : '700',
        textAlign : 'center'
    }
})

export {common, modal};
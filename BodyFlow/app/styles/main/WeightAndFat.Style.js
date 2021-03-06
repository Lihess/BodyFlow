// WeightAndFat.Style.js

import {StyleSheet} from 'react-native';
import {normalize} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    container : {
        width : '95%', 
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    box : {
        width : "48%",
        marginTop : '4%',
        padding : 15,
        backgroundColor : 'white',
        borderRadius : 10
    },
    icon : {
        color : '#848484',
    },
    title : {
        fontSize : normalize(13),
        fontWeight : '700',
        color : '#848484',
        marginLeft : 8
    },
    sizeBox : {
        justifyContent : 'flex-end',
        marginTop : 8
    },
    size : {
        flex : 1,
        fontSize : normalize(20),
        fontWeight : '700',
        textAlign : 'right'
    },
    unit : {
        fontSize : normalize(15),
        fontWeight : '700',
        color : '#848484',
        paddingBottom : 2,
        marginLeft : 5
    }
});

export default styles;
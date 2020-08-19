// WeightAndFat.Style.js

import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    container : {
        width : '90%', 
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
    empty : {
        color : '#848484'
    },
    title : {
        fontSize : screenWidth > 400 ? normalize(12) : normalize(14),
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
        fontSize : screenWidth > 400 ? normalize(20) : normalize(22),
        fontWeight : '700',
        textAlign : 'right'
    },
    unit : {
        fontSize : screenWidth > 400 ? normalize(14) : normalize(16),
        fontWeight : '700',
        color : '#848484',
        paddingBottom : 2,
        marginLeft : 5
    }
});

export default styles;
// SizeByPart.Style.js

import {StyleSheet} from 'react-native';
import {normalize} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    box : {
        width : '90%',
        padding : 5,
        margin : 5,
        borderRadius : 10,
        borderColor : '#c4c4c4',
        borderWidth : 1
    },
    smallText : {
        fontSize : normalize(10),
        fontWeight : '700',
        color : '#848484'
    },
    size : {
        fontSize : normalize(15),
        fontWeight : '700',
    }
});

export default styles;
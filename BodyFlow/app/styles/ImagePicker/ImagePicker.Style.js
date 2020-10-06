
import {StyleSheet} from 'react-native';
import {normalize, screenWidth} from '../ResponsiveFontSize.js'

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        position: 'relative'
    },
    header : {
        paddingHorizontal : 20,
        paddingTop : 10,
        paddingBottom : 20,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    headerTitle : {
        marginLeft : 10,
        fontSize : screenWidth > 400 ? normalize(20) : normalize(20),
        fontWeight : '700',
        textAlignVertical : 'center'
    },
    headerCount : {
        marginLeft : 10,
        paddingBottom : 3,
        fontSize : normalize(22),
        fontWeight : '700',
        textAlign : 'right',
        textAlignVertical : 'center'
    },
    headerSubtitle : {
        fontSize : normalize(18),
        fontWeight : '700',
        textAlignVertical : "bottom",
        color : '#848484'
    },
    submit : {
        fontSize : screenWidth > 400 ? normalize(15) : normalize(18),
        fontWeight : '700',
        textAlign : 'right',
        textAlignVertical : 'center'
    },
    emptyStay:{
        textAlign: 'center',
    },
    countBadge: {
        width : 25,
        height : 25,
        borderRadius: 50,
        position: 'absolute',
        right: 3,
        bottom: 3,
        justifyContent: 'center',
        backgroundColor: '#FF824A',
    },
    countBadgeText: {
        fontWeight : '700',
        alignSelf: 'center',
        color: 'white'
    }
});
  
  
export default styles;
import React from 'react';
import { NavigationService } from '../../router/service';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
// https://dingcodingco.tistory.com/14
// https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#manual-setup-import-storage-bucket
import styles from '../../styles/main/Gallery.Style'
import { readtPhotoAll } from '../../backend/Read'

export default class Gallery extends React.Component {
    state = {
        reset : false,
        photos : [],
        date : getToday()
    }

    //static getDerivedStateFromProps = (nextProps, prevState) => {
    //    if(nextProps.reset != prevState.reset)
    //        return { reset : !prevState.reset }
    //}

    componentDidMount = async() => {
        this.getData()
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.date != getToday()){
            this.setState({ date : getToday() })
        }
       //if(prevProps.reset != prevState.reset){
       //    this.getData()
       //    this.setState({ reset : true })
       //}
    }

    getData = () => {
        readtPhotoAll(result => {
            this.setState({ photos : result })
        })
    }

    onPeress = () => { 
        var photoCount = 0;
console.log(this.state.photos[0].date, getToday())
        if (this.state.photos[0].date == getToday()) {
            photoCount = this.state.photos[0].paths.length
        }
        console.log(photoCount)
        NavigationService.navigate('ImagePicker', {photoCount : photoCount})
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.placeholder}> 당신의 몸을 기록해보세요 </Text>
                <TouchableOpacity style={styles.button} onPress={this.onPeress}>
                    <MaterialCommunityIcons name="camera-plus" size={30} color="white" />
                </TouchableOpacity> 
 
            <View>
            {//this.state.photos.length ?
             //       this.state.photos.map(photo => {
             //           return (
             //               <View style={{flexDirection : 'row'}}>
             //                   {photo.paths.map(photo => {
             //                       return(<Image style={{width: 50, height: 50}} source={{uri : photo}}/>)
             //                   })}
             //               </View>
             //           
             //               )
             //         
             //         
             //       }) : null
               }
            </View>
                
            </View>
        );
    }
}

// 오늘 날짜를 형식에 맞추어 포맷팅하여 반환하는 함수
const getToday = () => {
    const today = new Date();

    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
   
    return year + (month > 9 ? '-' : '-0') + month + (day > 9 ? '-' : '-0') + day;
}

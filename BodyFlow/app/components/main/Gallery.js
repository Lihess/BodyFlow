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
        resetFlag : false,
        photos : []
    }

    // imagePicker를 통해 받은 사진을 state에 저장
    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(nextProps.photos && nextProps.photos != prevState.photos)
            return { photos : nextProps.photos }
    }

    componentDidMount() {
        readtPhotoAll(result => {
            this.setState({ photos : result })
        })
    }

    // 오늘 올린 사진의 갯수를 계산하여 imegaPicker로 넘김
    onPeress = () => { 
        var todayPhoto = 0

        this.state.photos.length && this.state.photos[0].date == getToday() ?
            todayPhoto = this.state.photos[0].paths.length : null
            
        NavigationService.navigate('ImagePicker', {todayPhoto : todayPhoto})
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.placeholder}> 당신의 몸을 기록해보세요 </Text>
                <TouchableOpacity style={styles.button} onPress={this.onPeress}>
                    <MaterialCommunityIcons name="camera-plus" size={30} color="white" />
                </TouchableOpacity> 
 
            <View>
            {this.state.photos.length ?
                    
                        
                            <View style={{flexDirection : 'row'}}>
                                {this.state.photos[0].paths.map(photo => {
                                    return(<Image style={{width: 50, height: 50}} source={{uri : photo}}/>)
                                })}
                            </View>
                        
                            
                      
                      
                     : null
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

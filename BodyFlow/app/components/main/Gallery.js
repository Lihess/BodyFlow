import React from 'react';
import { NavigationService } from '../../router/service';
import { View, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
// https://dingcodingco.tistory.com/14
// https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#manual-setup-import-storage-bucket
import styles from '../../styles/main/Gallery.Style'
import { readtPhotoAll } from '../../backend/Read'
import { FlatList } from 'react-native-gesture-handler';
import { common } from '../../styles/Common.Style';

export default class Gallery extends React.Component {
    state = {
        resetFlag : false,
        photos : []
    }

    // imagePicker를 통해 받은 사진을 state에 저장
    componentDidUpdate(prevProps) {
        if(this.props.photos && (prevProps.photos != this.props.photos))
           this.setState({ photos : this.props.photos })
           
    }

    componentDidMount = async() => {
        readtPhotoAll(result => {
            this.setState({ photos : result })
            console.log('result : ',  result.length)
            console.log('this.state.photos : ', this.state.photos.length)
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
                {this.state.photos.length ?
                    <FlatList
                        keyExtractor={item => item.date}
                        data={this.state.photos}
                        renderItem={({item}) => {
                            console.log('photo : ', item);
                                return(
                                    <View style={styles.dateByPhotos}>
                                        <Text style={styles.date}>{item.date.replace(/\-/g, '.')}</Text>
                                        <View style={styles.photoBox}>
                                            {item.paths.map(path => {
                                                return <Image style={styles.photo} source={{uri : path}}/>
                                            })}
                                        </View>
                                    </View>
                                )
                            }
                        }
                    /> 
                    : <Text style={styles.placeholder}> 당신의 몸을 기록해보세요 </Text>
                }
            
            <TouchableOpacity style={styles.button} onPress={this.onPeress}>
                    <MaterialCommunityIcons name="camera-plus" size={30} color="white" />
                </TouchableOpacity> 
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

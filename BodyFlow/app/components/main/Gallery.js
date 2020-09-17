import React from 'react';
import { NavigationService } from '../../router/service';
import { View, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
// https://dingcodingco.tistory.com/14
// https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#manual-setup-import-storage-bucket
import styles from '../../styles/main/Gallery.Style'
import { readtPhotoAll } from '../../backend/Read'
import { FlatList } from 'react-native-gesture-handler';

export default class Gallery extends React.Component {
    state = {
        resetFlag : false,
        photos : []
    }

    componentDidMount = async() => {
        readtPhotoAll(result => {
            this.setState({ photos : result })
        })
    }

    // imagePicker를 통해 받은 사진을 state에 저장
    componentDidUpdate(prevProps) {
        if(this.props.photos && (prevProps.photos != this.props.photos)){
            let photos = this.state.photos;
            
            // 사진 데이터의 가장 최근 날짜가 오늘인지 아닌지를 판단하여, 오늘 날짜에 맞추어 prop를 state.photos에 삽입
            photos.length && photos[0].date == getToday() ?
                (photos[0].paths).push(...this.props.photos) :
                photos.unshift({date : getToday(), paths : this.props.photos})

            this.setState({photos : photos})
        }
        
        if(this.props.deletePhoto && (prevProps.deletePhoto != this.props.deletePhoto)){
            readtPhotoAll(result => this.setState({ photos : result }))
        }
    }

    // 오늘 올린 사진의 갯수와 마지막 순번을 계산하여 imegaPicker로 넘김
    onPeress = () => { 
        var todayPhoto = 0;
        var lastOrnu = 0;

        if (this.state.photos.length && this.state.photos[0].date == getToday()){
            const pathsLen = this.state.photos[0].paths.length;

            todayPhoto = pathsLen
            lastOrnu = this.state.photos[0].paths[pathsLen - 1].ornu
        }
        
        NavigationService.navigate('ImagePicker', {todayPhoto : todayPhoto, lastOrnu : lastOrnu})
    }

    render(){
        return (
            <View style={styles.container}>
                {this.state.photos.length ?
                    <FlatList
                        keyExtractor={item => item.date}
                        style={styles.gallery}
                        data={this.state.photos}
                        renderItem={({item}) => {
                            return(
                                <View style={styles.dateByPhotos}>
                                    <Text style={styles.date}>{item.date.replace(/\-/g, '.')}</Text>
                                    <View style={styles.photoBox}>
                                        {item.paths.map((path, i) => {
                                            return (
                                                <TouchableOpacity key={i} style={styles.photoButton} onPress={() => NavigationService.navigate('PhotoPage', {date : item.date, ornu : path.ornu, path : path.path})}>
                                                    <Image style={styles.photo} source={{uri : path.path}}/>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </View>
                            )
                        }}
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

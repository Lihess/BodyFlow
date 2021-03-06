import React from 'react';
import { NavigationService } from '../../router/service';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
// https://dingcodingco.tistory.com/14
// https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#manual-setup-import-storage-bucket
import styles from '../../styles/main/Gallery.Style'
import { readtPhotoAll } from '../../backend/Read'
import { FlatList } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import getToday from '../GetToday'

export default class Gallery extends React.Component {
    state = {
        resetFlag : false,
        photos : []
    }

    componentDidMount = async() => {
        this.getData()
    }

    getData = () => {
        readtPhotoAll(result => {
            this.setState({ photos : result })
        })
    }

    // 오늘 올린 사진의 갯수와 마지막 순번을 imegaPicker로 넘김
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
                <NavigationEvents onDidFocus={this.getData}/>

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
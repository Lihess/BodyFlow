import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { NavigationService } from '../../router/service';
import * as Permissions from 'expo-permissions';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Amplify, { Storage } from 'aws-amplify';
// https://dingcodingco.tistory.com/14
// https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#manual-setup-import-storage-bucket
import styles from '../../styles/main/Gallery.Style'
import { createPhoto } from '../../backend/Create'
import { readtPhotoAll } from '../../backend/Read'

Amplify.configure({
    Auth: {
        identityPoolId: 'ap-northeast-2:fcc31825-3672-46c3-896c-8386f6890f03', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'ap-northeast-2', // REQUIRED - Amazon Cognito Region
    },
    Storage: {
        AWSS3: {
           bucket: 'body-flow', //REQUIRED - Amazon S3 bucket
           region: 'ap-northeast-2', //OPTIONAL - Amazon service region
       }
   }
});

export default class Gallery extends React.Component {
    state = {
        resetData : false,
        photos : []
    }

    componentDidMount = async() => {
        this.getData()
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    getData = () => {
        console.log('!')
        readtPhotoAll(result => {
            this.setState({ photos : result })
        })
    }

    // 파일 선택
    //pickImage = async () => {
    //    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //    try {
    //        let result = await ImagePicker.launchImageLibraryAsync({
    //          allowsEditing: false
    //        });
    //        if (!result.cancelled) {
    //          this.updateImage(result.uri);
    //        }
    //    } catch (E) {
    //        console.log(E);
    //    }
    //};
    onPeress = () => { 
        NavigationService.navigate('ImagePicker', {getData : this.getData()})
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
                    this.state.photos.map(photo => {
                        return (
                            <View style={{flexDirection : 'row'}}>
                                {photo.paths.map(photo => {
                                    return(<Image style={{width: 50, height: 50}} source={{uri : photo}}/>)
                                })}
                            </View>
                        
                            )
                      
                      
                    }) : null
                }
            </View>
                
            </View>
        );
    }
}

// 파일 이름을 유니크하게 하기 위한 함수
function guid() {
        function _s4() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + _s4() + _s4();
}
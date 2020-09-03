import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from '../../styles/main/Gallery.Style'
import {createPhoto} from '../../backend/Create'
// https://dingcodingco.tistory.com/14
// https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#manual-setup-import-storage-bucket
import Amplify, { Storage } from 'aws-amplify';

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
    componentDidMount = async() => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    // 파일 선택
    pickImage = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: false
            });
            if (!result.cancelled) {
              this.updateImage(result.uri);
            }
        } catch (E) {
            console.log(E);
        }
      };

    // 이미지를 s3에 저장하고 DB에 photo 객체 생성
    updateImage = async(uri) => {
        try {
            const fileName = guid()
            const fileExtension = uri.substr(uri.lastIndexOf('.') + 1)

            fetch(uri).then(response => {
                response.blob().then(blob => {
                    Storage.put(`images/${fileName}.${fileExtension}`, blob, {
                        contentType: `image/${fileExtension}`,
                    })
                    .then(() => {createPhoto(`https://body-flow.s3.ap-northeast-2.amazonaws.com/public/images/${fileName}.${fileExtension}`)})
                    .catch(err => console.log(err))
                })
            })
        } catch (err) {
            console.log(err)
        }
    }

//https://steemit.com/kr/@anpigon/react-native-flatlist-infinite-scroll-pull-down-refresh
// 무한 스크롤
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.placeholder}> 당신의 몸을 기록해보세요 </Text>
                <TouchableOpacity style={styles.button} onPress={this.pickImage}>
                    <MaterialCommunityIcons name="camera-plus" size={30} color="white" />
                </TouchableOpacity> 
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
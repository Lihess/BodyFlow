import React from 'react';
import { ImageBrowser } from 'expo-image-picker-multiple';
// https://snack.expo.io/@monstrodev/expo-image-picker-multiple-full-example
import { NavigationService } from '../router/service';
import { Ionicons } from '@expo/vector-icons'; 
import { View, TouchableOpacity, Text } from 'react-native';
import Amplify, { Storage } from 'aws-amplify';
import styles from '../styles/ImagePicker/ImagePicker.Style'
import { common } from '../styles/Common.Style';
import { createPhoto } from '../backend/Create'
import { readtPhotoAll } from '../backend/Read'

// AWS S3와 연결하기 위함. serverless 활용
// https://dingcodingco.tistory.com/14
// https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#manual-setup-import-storage-bucket
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

export default class ImagePicker extends React.Component {
    static navigationOptions = { headerShown : false };

    state = {
        count : 0
    }

    // 이미지를 s3에 저장하고 DB에 photo 객체 생성
    updateImage = (paths, uris) => {
        paths.map(async(path, i) => {
            try {
                const response = await fetch(uris[i]);
                const blob = await response.blob()
                
                Storage.put(`images/${path.substr(64)}`, blob, {
                    contentType: `image/${path.substr(path.lastIndexOf('.') + 1)}`
                })
                .then(() => {
                    createPhoto(path)
                })
                .catch(err => console.log(err))
                  
            } catch (err) {
                console.log(err)
            }
        })
    }

    // 이미지 uri를 받기 위한 함수
    imagesCallback = (callback) => {    
        callback.then(async (photos) => {
            const photoPaths = []
            const photoUris = []

            photos.map(photo => {
                const fileName = guid() + '.' + photo.uri.substr(photo.uri.lastIndexOf('.') + 1)
                const path = `https://body-flow.s3.ap-northeast-2.amazonaws.com/public/images/${fileName}`

                photoPaths.push(path)
                photoUris.push(photo.uri)
            })
            
            this.updateImage(photoPaths, photoUris)
            //readtPhotoAll(result => {
            //        console.log('2')
            //        NavigationService.navigate('MainPage', { photos : result });
            //    })
            
           
            // 새로 선택한 사진을 업데이트 한 후, 사진 데이터를 새롭게 받아서 gallery로 넘김
            // flag만 주고 받아서 하고 싶었으나 props가 한 번 지정된 후에는 imagepicker 에서 변경하지 않는 이상 어려워서..
            NavigationService.navigate('MainPage', { photos : photoPaths });
        })
        .catch((e) => console.log(e))
    };
    
    // count 올리는 함수
    updateHandler = (count, onSubmit) => {
        this.props.navigation.setParams({
          headerRight: onSubmit,
        });

        this.setState({ count : count })
    };

    render(){
        // todayPhoto의 갯수를 이용하여 max 값 조정. 하루에 최대 3개만 가능
        const todayPhoto = this.props.navigation.state.params ? this.props.navigation.state.params.todayPhoto : 0
        const max = (3 - todayPhoto) >= 0 ? (3 - todayPhoto) : 0
        
        return (
            <View style={[styles.flex, styles.container]}>
                <View style={styles.header}>
                    <View style={common.textBoxCenter}>
                        <Ionicons name="ios-arrow-back" size={24} color="black" onPress={() => NavigationService.back()}/>
                        <View style={common.textBoxCenter}>
                            <Text style={styles.headerTitle}> 사진 선택 </Text>
                            <Text style={[styles.headerCount, this.state.count > 0 ? {color : 'orange'} : {color : '#848484'}]}>{this.state.count}</Text>
                            <Text style={styles.headerSubtitle}> / {max}</Text>
                        </View>
                    </View>
                    
                    { // 1개 이상 선택한 경우!
                        this.state.count > 0 ?
                            <TouchableOpacity onPress={this.props.navigation.getParam('headerRight')}>
                                <Text style={styles.submit}> 완료 </Text>
                            </TouchableOpacity> : null
                    }
                </View>

                <ImageBrowser
                    max={max}
                    onChange={this.updateHandler}
                    callback={this.imagesCallback}
                    renderSelectedComponent={(number) => {
                        <View style={styles.countBadge}>
                            <Text style={styles.countBadgeText}>{number}</Text>
                        </View>
                        }}
                    emptyStayComponent={<Text style={styles.emptyStay}>저장된 사진이 없습니다.</Text>}
                />
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
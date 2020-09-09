import React from 'react';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { NavigationService } from '../router/service';
import { Ionicons } from '@expo/vector-icons'; 
import { View, TouchableOpacity, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Amplify, { Storage } from 'aws-amplify';
// https://dingcodingco.tistory.com/14
// https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#manual-setup-import-storage-bucket
import styles from '../styles/ImagePicker/ImagePicker.Style'
import { common } from '../styles/Common.Style';
import { createPhoto } from '../backend/Create'

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

// https://snack.expo.io/@monstrodev/expo-image-picker-multiple-full-example

export default class ImagePicker extends React.Component {
    static navigationOptions = { headerShown : false };

    state = {
        count : 0
    }

    // 이미지를 s3에 저장하고 DB에 photo 객체 생성
    updateImage = async(uri) => {
        try {
            const fileName = guid()
            const fileExtension = uri.substr(uri.lastIndexOf('.') + 1)

            const response = await fetch(uri);
            const blob = await response.blob()
            
            Storage.put(`images/${fileName}.${fileExtension}`, blob, {
                contentType: `image/${fileExtension}`
            })
            .then(() => {
                createPhoto(`https://body-flow.s3.ap-northeast-2.amazonaws.com/public/images/${fileName}.${fileExtension}`)
            })
            .catch(err => console.log(err))
              
        } catch (err) {
            console.log(err)
        }
    }

    // 이미지 uri를 받기 위한 함수
    imagesCallback = (callback) => {    
        callback.then(async (photos) => {
            const photoPaths = []

            for(let photo of photos) {
                photoPaths.push(photo.uri);
                this.updateImage(photo.uri)
            }
            
            NavigationService.navigate('MainPage', {reset : true});
        })
        .catch((e) => console.log(e))
        .finally(() => navigation.setParams({ loading: false }));
    };
    
    // count 올리는 함수
    updateHandler = (count, onSubmit) => {
        this.props.navigation.setParams({
          headerRight: onSubmit,
        });

        this.setState({ count : count })
    };

    render(){
        const {params} = this.props.navigation.state
        const max = params ? ((3 - params.photoCount) > 0 ? (3 - params.photoCount) : 0) : 3

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
                    
                    { this.state.count > 0 ?
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

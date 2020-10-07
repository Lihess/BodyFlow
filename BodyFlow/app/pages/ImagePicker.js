import React from 'react';
import * as ImageManipulator from "expo-image-manipulator";
import { ImageBrowser } from 'expo-image-picker-multiple';
// https://snack.expo.io/@monstrodev/expo-image-picker-multiple-full-example
import { NavigationService } from '../router/service';
import { Ionicons } from '@expo/vector-icons'; 
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/ImagePicker/ImagePicker.Style'
import { common } from '../styles/Common.Style';
import { createPhoto } from '../backend/Create'
import { s3UploadPhoto } from '../backend/s3Service'

export default class ImagePicker extends React.Component {
    static navigationOptions = { headerShown : false };

    state = {
        count : 0
    }

    // 이미지를 s3에 저장하고 DB에 photo 객체 생성
    updateImage = async(uri, width, height, ornu) => {
        // guid를 이용한 유니트한 이름 생성, 확장자도 같이
        const fileName = guid() + '.' + uri.substr(uri.lastIndexOf('.') + 1)
        
        // width, height를 비교하여 더 크기가 큰 쪽을 900으로 resize하여 파일을 압축!
        if (width > height && width > 900) {
            const compessPhoto = await ImageManipulator.manipulateAsync(uri, [{resize: { width : 900 }}]);
            uri = compessPhoto.uri;
        }
        else if (width < height && height > 900) {
            const compessPhoto = await ImageManipulator.manipulateAsync(uri, [{resize: { height : 900 }}]);
            uri = compessPhoto.uri;
        }
        
        s3UploadPhoto(uri, fileName)
            .then(() => 
                createPhoto(`https://body-flow.s3.ap-northeast-2.amazonaws.com/public/images/${fileName}`, ornu))
            .catch(err => console.log(err))
    }

    // 이미지 uri를 받기 위한 함수
    imagesCallback = (callback) => {    
        callback.then(async (photos) => {
            var ornu = this.props.navigation.state.params.lastOrnu

            photos.map((photo) => {
                ornu = ornu + 1
                this.updateImage(photo.uri, photo.width, photo.height, ornu)
               
                return {ornu : ornu, path : photo.uri}
            })
            
            // localurl을 이용하지 않는 대신 업로드 속도때문에 조금 느림..
            NavigationService.back();
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
                            <Text style={[styles.headerCount, this.state.count > 0 ? {color : '#FF824A'} : {color : '#848484'}]}>{this.state.count}</Text>
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

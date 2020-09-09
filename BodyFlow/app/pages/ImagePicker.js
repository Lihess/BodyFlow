import React from 'react';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { NavigationService } from '../router/service';
import * as Permissions from 'expo-permissions';
import { View, TouchableOpacity, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Amplify, { Storage } from 'aws-amplify';
// https://dingcodingco.tistory.com/14
// https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#manual-setup-import-storage-bucket

import { createPhoto } from '../backend/Create'
import { readtPhotoAll } from '../backend/Read'

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
    static navigationOptions = ({ navigation }) => {
        const headerTitle = navigation.getParam('headerTitle');
        const right = navigation.getParam('headerRight');
        const loading = navigation.getParam('loading');
        const headerLeft =
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>
                Back
            </Text>
          </TouchableOpacity>;
        const headerRight =
          <TouchableOpacity title={'Done'} onPress={right}>
            <Text>
              Done
            </Text>
          </TouchableOpacity>;
        const headerLoader = (
          <View style={styles.headerLoader}>
            <ActivityIndicator size="small" color={'#0580FF'}/>
          </View>
        );
    
        if (loading) return { headerTitle, headerLeft, headerRight: headerLoader };
        return { headerTitle, headerLeft, headerRight };
      };
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

    setImageUri = () => {

    }

    imagesCallback = (callback) => {    
        const { navigation } = this.props;
        navigation.setParams({ loading: true });

        callback.then(async (photos) => {
            const photoPaths = {data : getToday(), paths : []}

            for(let photo of photos) {
                photoPaths.paths.push(photo.uri);
                //this.updateImage(photo.uri)
            }
            
            NavigationService.navigate('MainPage', {reset : true});
        })
        .catch((e) => console.log(e))
        .finally(() => navigation.setParams({ loading: false }));
    };

    renderSelectedComponent = (number) => (
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{number}</Text>
        </View>
      );
    
    updateHandler = (count, onSubmit) => {
      this.props.navigation.setParams({
        headerTitle: `Selected ${count} files`,
        headerRight: onSubmit,
      });
    };

    render(){
        const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;
        return (
            <View style={[styles.flex, styles.container]}>
                <ImageBrowser
                  max={4}
                  onChange={this.updateHandler}
                  callback={this.imagesCallback}
                  renderSelectedComponent={this.renderSelectedComponent}
                  emptyStayComponent={emptyStayComponent}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
      flex: 1
    },
    container: {
      position: 'relative'
    },
    emptyStay:{
      textAlign: 'center',
    },
    countBadge: {
      paddingHorizontal: 8.6,
      paddingVertical: 5,
      borderRadius: 50,
      position: 'absolute',
      right: 3,
      bottom: 3,
      justifyContent: 'center',
      backgroundColor: '#0580FF'
    },
    countBadgeText: {
      fontWeight: 'bold',
      alignSelf: 'center',
      padding: 'auto',
      color: '#ffffff'
    }
  });
  

  
// 파일 이름을 유니크하게 하기 위한 함수
function guid() {
    function _s4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}
return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + _s4() + _s4();
}

// 오늘 날짜를 형식에 맞추어 포맷팅하여 반환하는 함수
const getToday = () => {
    const today = new Date();

    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
   
    return year + (month > 8 ? '-' : '-0') + month + (day > 9 ? '-' : '-0') + day;
}
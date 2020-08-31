import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from '../../styles/main/Gallery.Style'

var AWS = require('aws-sdk/dist/aws-sdk-react-native');

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-2:dc345757-8b24-4ea7-956e-932ae11f8a91'
    })
});

const s3 = new AWS.S3({
    apiVersion: '2006-03-01'
})


export default class Gallery extends React.Component {
    state = {
        modalVisible : false,
        image: null,
    }
    
    getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
    };

    _pickImage = async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 3,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
            this.updateImage();
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };
    
    updateImage = async() => {
        const response1 = await fetch(this.state.image) //this.state.photo 에는 사진의 uri가 들어가면 됨. 
        const blob = await response1.blob()
        var params = {Bucket: 'body-flow', Key: `'1'.jpeg`, Body: blob, ACL: 'public-read'}
        s3.upload(params, function(err, data) {
            if (err) {
                return alert('There was an error uploading your photo: ', err.message);
            }
            alert('Successfully uploaded photo.');
        });
    }

    toggleVisible = () => {
        this.setState({modalVisible : !this.state.modalVisible})
    }
//https://steemit.com/kr/@anpigon/react-native-flatlist-infinite-scroll-pull-down-refresh
// 무한 스크롤
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.placeholder}> 당신의 몸을 기록해보세요 </Text>
                <TouchableOpacity style={styles.button} onPress={this._pickImage}>
                    <MaterialCommunityIcons name="camera-plus" size={30} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
}
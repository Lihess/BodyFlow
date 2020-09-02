import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { View, TouchableOpacity,Image, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from '../../styles/main/Gallery.Style'

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
            base64 : true,
            allowsEditing: false
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
        try {
          console.log(this.state.image)
            fetch(this.state.image).then(response => {
              response.blob().then(blob => {
                Storage.put(`images/7.png`, blob, {
                  contentType: 'image/png',
             }).then(data => console.log(data))
             .catch(err => console.log(err))
              })
            })
            
        } catch (err) {
            console.log(err)
        }
    }

    toggleVisible = () => {
        this.setState({modalVisible : !this.state.modalVisible})
    }
//https://steemit.com/kr/@anpigon/react-native-flatlist-infinite-scroll-pull-down-refresh
// 무한 스크롤
    render(){
        return (
            <View style={styles.container}>
              <Image style={{width:'60%', backgroundColor : 'red'}} source={{uri :'https://body-flow.s3.ap-northeast-2.amazonaws.com/public/images/1.png'}}></Image>
                <Text style={styles.placeholder}> 당신의 몸을 기록해보세요 </Text>
                <TouchableOpacity style={styles.button} onPress={this._pickImage}>
                    <MaterialCommunityIcons name="camera-plus" size={30} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
}
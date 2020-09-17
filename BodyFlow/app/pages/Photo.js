import React from 'react';
import { NavigationService } from '../router/service';
import { Image, SafeAreaView, StatusBar, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/photo/Photo.Style';
import { readtPhoto } from '../backend/Read'
import { deletePhoto } from '../backend/Delete'
import { s3DeletePhoto } from '../backend/s3Service'

export default class Photo extends React.Component {
    static navigationOptions = { headerShown : false };

    state = {
        date : this.props.navigation.state.params.date,
        ornu : this.props.navigation.state.params.ornu,
        path : this.props.navigation.state.params.path
    }

    // 사진 삭제
    deletePhoto = () => {
        // path가 local uri일 경우, s3 path를 읽어들여서 삭제함
        if (this.state.path.substr(0, this.state.path.lastIndexOf('/')) != 'https://body-flow.s3.ap-northeast-2.amazonaws.com/public/images' ) {
            readtPhoto(this.state.date, this.state.ornu, (result) => {
                s3DeletePhoto(result)
                    .then(() => deletePhoto(this.state.date, this.state.ornu))
            })
        } 
        else {
            s3DeletePhoto(this.state.path)
                .then(() => deletePhoto(this.state.date, this.state.ornu))
        }

        // 삭제한 path를 prop로 넘겨, 데이터를 다시 불러올 수 있도록 함
        NavigationService.navigate('MainPage', { deletePhoto : this.state.path });
    }

    render(){
        console.log(this.state.photo)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={'black'} barStyle={"light-content"}/>
                
                <View style={styles.iconBox}/>
                <Feather name="x" style={styles.xIcon} size={24} color="white" onPress={() => NavigationService.back()} />
                <MaterialCommunityIcons style={styles.trashIcon} name="trash-can-outline" size={24} color="white" onPress={this.deletePhoto}/>
                
                <Image style={styles.photo} source={{uri : this.state.path}}/> 
            </SafeAreaView>
        );
    }
}

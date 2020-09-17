import React from 'react';
import { NavigationService } from '../router/service';
import { Image, SafeAreaView, StatusBar } from 'react-native';
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

    deletePhoto = async() => {
        var path = this.state.path;
        console.log('path ',path)
        if (path.substr(0, path.lastIndexOf('/')) != 'https://body-flow.s3.ap-northeast-2.amazonaws.com/public/images' ) {
            readtPhoto(this.state.date, this.state.ornu, (result) => {
                console.log('path ', result)
                path = result
            })
        }
        
        s3DeletePhoto(path)
            .then(
                () => deletePhoto(this.state.date, this.state.ornu)
            )

        NavigationService.navigate('MainPage', { deletePhoto : path });
    }

    render(){
        console.log(this.state.photo)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={'black'} barStyle={"light-content"}/>
                
                <Feather name="x" style={styles.xIcon} size={24} color="white" onPress={() => NavigationService.back()} />
                <MaterialCommunityIcons style={styles.trashIcon} name="trash-can-outline" size={24} color="white" onPress={this.deletePhoto}/>
                <Image style={styles.photo} resizeMode="contain" source={{uri : this.state.path}}/> 
            </SafeAreaView>
        );
    }
}

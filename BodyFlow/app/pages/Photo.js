import React from 'react';
import { NavigationService } from '../router/service';
import { Image, SafeAreaView, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from '../styles/photo/Photo.Style';

export default class Photo extends React.Component {
    static navigationOptions = { headerShown : false };

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={'black'} barStyle={"light-content"}/>
                
                <Feather name="x" style={styles.xIcon} size={24} color="white" onPress={() => NavigationService.back()} />
                <Image style={styles.photo} resizeMode="contain" source={{uri : this.props.navigation.state.params.path}}/> 
            </SafeAreaView>
        );
    }
}

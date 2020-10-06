import React from 'react';
import Modal from 'react-native-modal';
import { NavigationService } from '../router/service';
import { Image, SafeAreaView, StatusBar, View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { modal } from '../styles/Common.Style';
import styles from '../styles/photo/Photo.Style';
import { deletePhoto } from '../backend/Delete'
import { s3DeletePhoto } from '../backend/s3Service'

export default class Photo extends React.Component {
    static navigationOptions = { headerShown : false };

    state = {
        modalVisible : false,
        date : this.props.navigation.state.params.date,
        ornu : this.props.navigation.state.params.ornu,
        path : this.props.navigation.state.params.path
    }

    toggleVisible = () => {
        this.setState({ modalVisible : !this.state.modalVisible })
    }

    // 사진 삭제
    deletePhoto = () => {
        s3DeletePhoto(this.state.path)
            .then(() => deletePhoto(this.state.date, this.state.ornu))

        this.toggleVisible()
        // 삭제한 path를 prop로 넘겨, 데이터를 다시 불러올 수 있도록 함
        NavigationService.back();
    }

    render(){

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={'black'} barStyle={"light-content"}/>
                
                <View style={styles.iconBox}/>
                <Feather name="x" style={styles.xIcon} size={24} color="white" onPress={() => NavigationService.back()} />
                <MaterialCommunityIcons style={styles.trashIcon} name="trash-can-outline" size={24} color="white" onPress={this.toggleVisible}/>
                
                <Image style={styles.photo} source={{uri : this.state.path}}/> 

                {/* 삭제 확인창 */}
                <Modal
                    style={modal.background}
                    isVisible={this.state.modalVisible}
                    onBackdropPress={this.toggleVisible} 
                    onBackButtonPress={this.toggleVisible}
                    backdropColor={'#1f1f1f'}>

                    <View style={styles.modalBox}>
                        <Text style={styles.confirmation}> 정말로 삭제하시겠습니까?  </Text>
                        <View style={styles.buttonBox}>
                            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={this.toggleVisible}>
                                <Text style={styles.buttonText}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.confirm]} onPress={this.deletePhoto} >
                                <Text style={[styles.buttonText, styles.confirmText]}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

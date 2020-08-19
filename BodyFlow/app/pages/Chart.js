
import React from 'react';
import { NavigationService } from '../router/service';
import { SafeAreaView, TouchableOpacity, View, Text, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { common } from '../styles/Common.Style';
import styles from '../styles/chart/Chart.style';
import PartPicker from '../components/modal/PartPicker';

export default class Chart extends React.Component {
    static navigationOptions = { headerShown : false };

    state = {
        part : this.props.navigation.state.params.part,
        modalVisible : false
    }

    // visible 값 변경
    toggleVisible = () => {
        this.setState({modalVisiable : !this.state.modalVisiable})
    }

    // part 변경
    onChangPart = (part) => {
        this.setState({part : part})
    }

    render(){
        return (
            <SafeAreaView style={common.container}>
                <StatusBar backgroundColor={'#f1f1f1'} barStyle="dark-content"/>
                <View style={common.textBoxCenter}>
                    <Ionicons name="ios-arrow-back" size={24} color="black" onPress={() => NavigationService.back()}/>
                    <TouchableOpacity style={styles.titleBox} onPress={this.toggleVisible}>
                        <Text style={styles.title}>{this.state.part}</Text>
                        <Ionicons name="md-arrow-dropdown" size={20} color="black" />
                    </TouchableOpacity>
                </View>

                <PartPicker 
                    visible={this.state.modalVisiable} 
                    part={this.state.part} 
                    onBackdropPress={this.toggleVisible}
                    onSubmit={(part) => this.onChangPart(part)}/>
            </SafeAreaView>
        );
    }
}
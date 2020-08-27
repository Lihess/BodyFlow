// Chart.js
// 각 부위별 차트를 보여주는 페이지
import React from 'react';
import { NavigationService } from '../router/service';
import { SafeAreaView, TouchableOpacity, View, Text, StatusBar } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Ionicons } from '@expo/vector-icons'; 
import { common } from '../styles/Common.Style';
import styles from '../styles/chart/Chart.style';
import PartPicker from '../components/modal/PartPicker';
import ChartByPart from '../components/chart/ChartByPart';

export default class Chart extends React.Component {
    static navigationOptions = { headerShown : false };

    state = {
        part : this.props.navigation.state.params.part ? this.props.navigation.state.params.part : '어깨',
        modalVisible : false,
        unit : 'cm',
        period : 'lately'
    }

    // visible 값 변경
    toggleVisible = () => {
        this.setState({modalVisiable : !this.state.modalVisiable})
    }

    // part 변경
    onChangPart = (selectPart) => {
        this.setState({part : selectPart})
    }

    // 단위 선택 시, 해당 단위로 state 값 변경
    onSelectUnit = (value) => {
        value == 0 ? this.setState({unit : 'cm'}) : this.setState({unit : 'in'});
    }

    // 기간 선택 시, 해당 기간으로 state 값 변경
    onSelectPeriod = (value) => {
        value == 0 ? this.setState({period : 'lately'}) : this.setState({period : 'total'})
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

                <View style={styles.selectorBox}>
                    <SwitchSelector 
                            style={styles.switch}
                            options={[
                                {label : '최근', value : '0'},
                                {label : '전체', value : '1'}
                            ]} 
                            initial={0} 
                            buttonColor={'#c4c4c4'}
                            borderRadius={5.5}
                            height={30}
                            alignItems={'center'}
                            textStyle={styles.switchFont}
                            selectedTextStyle={styles.switchFont}
                            onPress={value => this.onSelectPeriod(value)} />

                    { this.state.part != '체중' ?
                        <SwitchSelector 
                            style={styles.switch}
                            options={[
                                {label : 'cm', value : '0'},
                                {label : 'inch', value : '1'}
                            ]} 
                            initial={0} 
                            buttonColor={'#c4c4c4'}
                            borderRadius={5.5}
                            height={30}
                            alignItems={'center'}
                            textStyle={styles.switchFont}
                            selectedTextStyle={styles.switchFont}
                            onPress={value => this.onSelectUnit(value)} /> : null }
                </View>

                <ChartByPart part={this.state.part} period={this.state.period} unit={this.state.unit}/>

                <PartPicker 
                    visible={this.state.modalVisiable} 
                    part={this.state.part} 
                    onBackdropPress={this.toggleVisible}
                    onSubmit={(part) => this.onChangPart(part)}/>
            </SafeAreaView>
        );
    }
}
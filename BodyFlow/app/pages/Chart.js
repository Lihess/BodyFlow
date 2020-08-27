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
import DataBox from '../components/chart/DataBox'
import { readSizeByPartsLimit7, readSizeByPartsAll } from '../backend/Read';

export default class Chart extends React.Component {
    static navigationOptions = { headerShown : false };

    state = {
        part : this.props.navigation.state.params.part ? this.props.navigation.state.params.part : '어깨',
        modalVisible : false,
        unit : 'cm',
        period : 'lately',
        data : []
    }

     // 선택된 기간에 맞게 데이터 불러오기
     componentDidMount = () => {
        this.getData()
    }

    // props 변경 시 데이터를 다시 불러옴
    // prevProps, prevState, snapshot 순의 인자.
    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.part != prevState.part)
            this.getData()
        else if (this.props.period != prevState.period){
            // 최근 데이터가 7개 미만이면 전체 데이터가 최근 데이터랑 동일하므로
            if ((this.state.period == 'total' && this.state.data.length == 6) || (this.state.period == 'lately' && this.state.data.length > 6)) 
                this.getData()
        }
    }

    // 데이터를 불러옴
    getData = () => {
        this.state.period == 'lately' ?
            readSizeByPartsLimit7(this.state.part, result => {
                this.setState({data : result})
            }) 
            : readSizeByPartsAll(this.state.part, result => {
                this.setState({data : result})
            })
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
                    <TouchableOpacity style={styles.partBox} onPress={this.toggleVisible}>
                        <Text style={styles.part}>{this.state.part}</Text>
                        <Ionicons name="md-arrow-dropdown" size={20} color="black" />
                    </TouchableOpacity> 
                </View>

                <View style={styles.switchBox}>
                    <SwitchSelector 
                            style={styles.switch}
                            options={[
                                {label : '최근', value : '0'},
                                {label : '전체', value : '1'}
                            ]} 
                            initial={0} 
                            backgroundColor={'#f1f1f1'}
                            buttonColor={'#d4d4d4'}
                            borderRadius={5.5}
                            height={30}
                            alignItems={'center'}
                            textStyle={styles.switchFont}
                            selectedTextStyle={styles.switchSelect}
                            onPress={value => this.onSelectPeriod(value)} />

                    { this.state.part != '체중' && this.state.part != '체지방률'?
                        <SwitchSelector 
                            style={styles.switch}
                            options={[
                                {label : 'cm', value : '0'},
                                {label : 'inch', value : '1'}
                            ]} 
                            initial={0} 
                            backgroundColor={'#f1f1f1'}
                            buttonColor={'#d4d4d4'}
                            borderRadius={5.5}
                            height={30}
                            alignItems={'center'}
                            textStyle={styles.switchFont}
                            selectedTextStyle={styles.switchSelect}
                            onPress={value => this.onSelectUnit(value)} /> : null }
                </View>

                <ChartByPart data={this.state.data} period={this.state.period} unit={this.state.unit}/>

                
                {this.state.data.length && this.state.period == 'lately' ?
                    <View>
                        {this.state.data.map((data, i) => 
                        <DataBox 
                            date={data.date} 
                            part={this.state.part}
                            size={this.state.unit == 'cm' ? data.sizeByPart : (data.sizeByPart / 2.54).toFixed(2)} 
                            variance={i == 0 ? 0 : 
                                        (this.state.unit == 'cm' ? data.sizeByPart - this.state.data[i-1].sizeByPart : ((data.sizeByPart/ 2.54).toFixed(2) - (this.state.data[i-1].sizeByPart) / 2.54).toFixed(2))}/>)}
                    </View> : null
                }
                
                <PartPicker 
                    visible={this.state.modalVisiable} 
                    part={this.state.part} 
                    onBackdropPress={this.toggleVisible}
                    onSubmit={(part) => this.onChangPart(part)}/>
            </SafeAreaView>
        );
    }
}
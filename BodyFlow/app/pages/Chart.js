// Chart.js
// 각 부위별 차트를 보여주는 페이지
import React from 'react';
import { NavigationService } from '../router/service';
import { SafeAreaView, TouchableOpacity, View, ScrollView, Text, StatusBar } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Ionicons } from '@expo/vector-icons'; 
import { common } from '../styles/Common.Style';
import styles from '../styles/chart/Chart.style';
import PartPicker from '../components/modal/PartPicker';
import ChartByPart from '../components/chart/ChartByPart';
import DataByDate from '../components/chart/DataByDate'
import { readSizeByPartsLimit7, readSizeByPartsAll } from '../backend/Read';
import { cmToInch } from '../components/ChangeUnit'

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

    // 데이터를 불러옴
    getData = async() => {
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
    onChangPart = async(selectPart) => {
        await this.setState({part : selectPart})
        this.getData()
    }

    // 단위 선택 시, 해당 단위로 state 값 변경
    onSelectUnit = (value) => {
        value == 0 ? this.setState({unit : 'cm'}) : this.setState({unit : 'in'});
    }

    // 기간 선택 시, 해당 기간으로 state 값 변경
    onSelectPeriod = async(value) => {
        await value == 0 ? this.setState({period : 'lately'}) : this.setState({period : 'total'})

        // 최근 데이터가 7개 미만이면 전체 데이터가 최근 데이터랑 동일하므로
        if ((this.state.period == 'total' && this.state.data.length == 7) || (this.state.period == 'lately' && this.state.data.length > 7)) 
            this.getData()
    }

    onChangeData = () => {
        this.getData()
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
                                {label : '최근', value : 0},
                                {label : '전체', value : 1}
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
                                {label : 'cm', value : 0},
                                {label : 'inch', value : 1}
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
                    <ScrollView style={styles.dataBox}>
                        {this.state.data.map((data, i) => 
                        <DataByDate 
                            key={i}
                            date={data.date} 
                            part={this.state.part}
                            size={this.state.unit == 'cm' ? data.sizeByPart : cmToInch(data.sizeByPart)} 
                            unit={this.state.unit}
                            variance={i == 0 ? 
                                        0 : 
                                        (this.state.unit == 'cm' ? 
                                            (data.sizeByPart - this.state.data[i-1].sizeByPart).toFixed(2)
                                            : (cmToInch(data.sizeByPart) - cmToInch(this.state.data[i-1].sizeByPart)).toFixed(2))}
                            last={i == this.state.data.length - 1 ? true : false}
                            onChangeData={this.onChangeData}                
                            />)}
                    </ScrollView> : null
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
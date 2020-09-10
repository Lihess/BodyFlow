// Chart.js
// 각 부위별 차트를 보여주는 페이지
import React from 'react';
import { NavigationService } from '../router/service';
import { SafeAreaView, TouchableOpacity, View, FlatList, Text, StatusBar } from 'react-native';
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

    // 데이터 불러오기.
    // 중복을 최소화하고 싶었으나, state 값을 data가 아닌 다른것도 바꿔야 하는 경우 통일 불가
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
        this.state.period == 'lately' ?
            readSizeByPartsLimit7(selectPart, result => {
                this.setState({data : result, part : selectPart})
            }) 
            : readSizeByPartsAll(selectPart, result => {
                this.setState({data : result, part : selectPart})
            })
    }

    // 단위 선택 시, 해당 단위로 state 값 변경
    onSelectUnit = (value) => {
        value == 0 ? this.setState({unit : 'cm'}) : this.setState({unit : 'in'});
    }

    // 기간 선택 시, 해당 기간으로 state 값을 변경하고 데이터의 길이에 따라 데이터를 다시 불러옴
    onSelectPeriod = (value) => {
        if (value == 0) {
            // 전체 데이터가 7개 이상하면 최근 데이터를 다시 불러와야 함!
            if (this.state.data.length > 7)
                readSizeByPartsLimit7(this.state.part, result => {
                    this.setState({data : result, period : 'lately'})
                }) 
            else this.setState({period : 'lately'})
        }
        else {
            // 최근 데이터가 7개면 전체 데이터는 더 많이 존재할 수 있으므로!
            if (this.state.data.length = 7) 
                readSizeByPartsAll(this.state.part, result => {
                    this.setState({data : result, period : 'total'})
                })
            else this.setState({period : 'total'})
        }
    }
    
    render(){
        const dataReverse = this.state.data.slice().reverse();
        
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
                
                <FlatList style={styles.dataBox}>
                    {dataReverse.map((data, i) => 
                        <DataByDate 
                            key={i}
                            date={data.date} 
                            part={this.state.part}
                            size={this.state.unit == 'cm' ? data.sizeByPart : cmToInch(data.sizeByPart)} 
                            unit={this.state.unit}
                            variance={i == 0 ? 
                                        '0.00' : 
                                        (this.state.unit == 'cm' ? 
                                            (data.sizeByPart - this.state.data[i-1].sizeByPart).toFixed(2)
                                            : (cmToInch(data.sizeByPart) - cmToInch(this.state.data[i-1].sizeByPart)).toFixed(2))}
                            last={(i == this.state.length - 1 && i > 7) ? true : false}
                            onChangeData={this.getData}                
                            />)}
                </FlatList>
                
                <PartPicker 
                    visible={this.state.modalVisiable} 
                    part={this.state.part} 
                    onBackdropPress={this.toggleVisible}
                    onSubmit={(part) => this.onChangPart(part)}/>
            </SafeAreaView>
        );
    }
}
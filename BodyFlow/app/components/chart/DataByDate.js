import React from 'react';
import { TouchableOpacity, View, Text } from "react-native";
import MeasurandRecord from '../modal/MeasurandRecord';
import styles from '../../styles/chart/DataByDate.Style'

export default class DataByDate extends React.Component {
    state = {
        modalVisible : false
    }

    // visible 값 변경
    toggleVisible = () => {
        this.setState({modalVisible : !this.state.modalVisible})
    }

    onChangeSize = () => {
        this.props.onChangeData();
    }

    render(){
        return (
            <View>
            { this.props.part != '체지방률' ?
                <View>
                    <TouchableOpacity style={[styles.box, this.props.last ? null : styles.bottomLine]} onPress={this.toggleVisible}>
                        <Text style={styles.date}>{this.props.date.replace(/\-/g, '.')}</Text>
                        <View style={styles.sizeBox}>
                            <Text style={styles.size}>{this.props.size}</Text>
                            <Text style={styles.unit}>  {this.props.unit}</Text> 
                        </View>
                        <Text style={[styles.variance, this.props.variance < 0 ? {color : '#10B3A2'} : ( this.props.variance != 0 ? {color : '#FF2601'} : null )]}>
                            {this.props.variance}
                        </Text>
                    </TouchableOpacity>
                    <MeasurandRecord
                        visible={this.state.modalVisible} 
                        part={this.props.part} 
                        date={this.props.date}
                        size={this.props.size}
                        onBackdropPress={this.toggleVisible}
                        onSubmit={this.onChangeSize}/> 
                </View>
                // 체지방률은 수정불가로, 버튼 x
                : <View style={[styles.box, this.props.last ? null : styles.bottomLine]}>
                    <Text style={styles.date}>{this.props.date.replace(/\-/g, '.')}</Text>
                    <View style={styles.sizeBox}>
                        <Text style={styles.size}>{this.props.size}</Text>
                        <Text style={styles.unit}>  %</Text> 
                    </View>

                    <Text style={[styles.variance, this.props.variance < 0 ? {color : '#10B3A2'} : ( this.props.variance != 0 ? {color : '#FF2601'} : null )]}>
                        {this.props.variance}
                    </Text>
                </View>
            }</View>
            
        );
    }
}
import React from 'react';
import { TouchableOpacity, View, Text } from "react-native";
import MeasurandRecord from '../modal/MeasurandRecord';
import FatReqiremenetRecord from '../modal/FatReqiremenetRecord';
import styles from '../../styles/chart/DataByDate.Style'
import { common } from '../../styles/Common.Style'

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
                <TouchableOpacity style={[styles.box, this.props.last ? null : styles.bottomLine]} onPress={this.toggleVisible}>
                    <Text style={styles.date}>{this.props.date.replace(/\-/g, '.')}</Text>
                    <View style={styles.sizeBox}>
                        <Text style={styles.size}>{this.props.size}</Text>
                        { this.props.part == '체지방률' ? 
                            <Text style={styles.unit}>  %</Text> 
                            : <Text style={styles.unit}>  {this.props.unit}</Text> 
                        }
                    </View>
                    <Text 
                        style={[styles.variance, 
                            this.props.variance < 0 ? {color : '#10B3A2'} 
                                : ( this.props.variance != 0 ? {color : '#FF2601'} : null )]}>
                        {this.props.variance}
                    </Text>
                </TouchableOpacity>

                { this.props.part != '체지방률' ? 
                    <MeasurandRecord
                        visible={this.state.modalVisible} 
                        part={this.props.part} 
                        date={this.props.date}
                        size={this.props.size}
                        onBackdropPress={this.toggleVisible}
                        onSubmit={this.onChangeSize}/> : null
                }
            </View>
        );
    }
}
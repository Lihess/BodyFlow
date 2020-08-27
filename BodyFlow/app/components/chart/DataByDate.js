import React from 'react';
import { TouchableOpacity, View, Text } from "react-native";
import Record from '../modal/MeasurandRecord';
import styles from '../../styles/chart/DataByDate.Style'
import { common } from '../../styles/Common.Style'

export default class DataByDate extends React.Component {
    state = {
        modalVisiable : false,
        modalPart : null
    }

    // visible 값 변경
    toggleVisible = () => {
        this.setState({modalVisiable : !this.state.modalVisiable})
    }

    onChangeSize = ( size ) => {
        this.props.onChangeData(size);
    }

    render(){
        return (
            <View>
                <TouchableOpacity style={[styles.box, this.props.last ? null : styles.bottomLine]} onPress={this.toggleVisible}>
                    <Text style={styles.date}>{this.props.date.replace(/\-/g, '.')}</Text>
                    <View style={common.textBoxEnd}>
                        <Text style={styles.size}>{this.props.size}</Text>
                        <Text style={styles.unit}> {this.props.unit}</Text>
                    </View>
                    <Text>{this.props.variance}</Text>
                </TouchableOpacity>

                <Record 
                    visible={this.state.modalVisiable} 
                    part={this.props.part} 
                    day={this.props.date}
                    size={this.props.size}
                    onBackdropPress={this.toggleVisible}
                    onSubmit={(size) => this.onChangeSize(size)}/>
            </View>
        );
    }
}
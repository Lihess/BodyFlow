// PartPicker.js
// chart에서 part를 지정하기 위한 modal
import React from 'react';
import Modal from 'react-native-modal';
import { Text, View } from 'react-native';
import { modal } from '../../styles/Common.Style.js';
import styles from '../../styles/modal/PartPicker.Style';

export default class PartPicker extends React.Component{
    state = {
        visible : false,
        part : this.props.part 
    } 

    // props 값이 변경된 경우 state 값 변경
    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(nextProps.visible != prevState.visible) 
            return { 
                visible : nextProps.visible,
                part : nextProps.part
            };
        else return null;
    }

    // Modal이 열려있을때만 실행되는 함수
    closedModal = () => {
        if (this.state.visible) { 
            this.props.onBackdropPress()
            this.setState({
                visible : false,
                day : null
            })
        }
    }

    // 클릭 시 submit!
    onSubmit = (part) => {
        this.props.onSubmit(part)
        this.closedModal()
    }

    render(){
        const parts = ['체중', '체지방', '어깨', '윗가슴', '팔뚝', '허리', '엉덩이', '허벅지', '종아리']

        return (
            <Modal 
                style={modal.background}
                isVisible={this.state.visible}
                onBackdropPress={this.closedModal} 
                onBackButtonPress={this.closedModal}
                backdropColor={'#1f1f1f'}>

                <View style={[modal.box, {padding : 0}]}>
                    {
                        parts.map((part, i) => {
                            return(
                                <View style={[
                                    part == '종아리' ? styles.partBoxLast : styles.partBox,
                                    part == this.state.part ? styles.selectPartBox : null
                                    ]}>
                                    <Text 
                                        style={[styles.partFont, part == this.state.part ? styles.selectPart : null]} 
                                        onPress={()=>this.onSubmit([part])}>
                                        {part}
                                    </Text>
                                </View>
                            );
                        })
                    }
                </View>
            </Modal>
        );
    }
}
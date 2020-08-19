// BodySize.js
// 인체 이미지, 신체 사이즈 표기를 위한 파일

import React from 'react';
import { View, Image } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
// https://reactnativeexample.com/switch-selector-to-react-native/
import SizeByPart from './SizeByPart.js';
import styles from '../../styles/main/BodySize.Style.js';

export default class BodySize extends React.Component {
    state = {
        unit : 'cm'
    }

    // 단위 선택 시, 해당 단위로 state 값 변경
    onSelectUnit = (value) => {
        value == 0 ? this.setState({unit : 'cm'}) : this.setState({unit : 'in'});
    }

    render(){
        return (
            <View style={styles.container}>
                <Image style={{width:'60%', resizeMode : 'contain'}} source={require('../../assets/body.jpg')}/>
                {/* 임시 이미지 */}
                <View style={styles.sizesBox}>
                    {/* cm, inch 변환을 위한 스위치. 스타일 조정이 따로 안돼서.. */}
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
                        onPress={value => this.onSelectUnit(value)} />
                    {/* 부위별 사이즈 */}
                    <SizeByPart unit={this.state.unit} onPress={this.onPressButton}/>
                </View>
            </View>
        );
    }
}
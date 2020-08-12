import React from 'react';
import { Text, View, Image } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import SizeByPart from './SizeByPart.js';
import styles from '../styles/BodySize.Style.js';

export default class BodySize extends React.Component {
    state = {
        unit : 'cm'
    }

    selectUnit = (value) => {
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
                        onPress={value => this.selectUnit(value)} />
                    {/* 부위별 사이즈 */}
                    <SizeByPart unit={this.state.unit}/>
                </View>
            </View>
        );
    }
}
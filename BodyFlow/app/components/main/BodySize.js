// BodySize.js
// 인체 이미지, 신체 사이즈 표기를 위한 파일

import React from 'react';
import { View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
// https://reactnativeexample.com/switch-selector-to-react-native/
import SizeByPart from './SizeByPart.js';
import styles from '../../styles/main/BodySize.Style.js';

export default class BodySize extends React.Component {
    image = {
        어깨 : require('../../assets/body/어깨.png'),
        윗가슴 : require('../../assets/body/윗가슴.png'),
        팔뚝 : require('../../assets/body/팔뚝.png'),
        허리 : require('../../assets/body/허리.png'),
        엉덩이 : require('../../assets/body/엉덩이.png'),
        허벅지 : require('../../assets/body/허벅지.png'),
        종아리 : require('../../assets/body/종아리.png'),
    }
    
    state = {
        unit : 'cm',
        part : null
    }

    // 단위 선택 시, 해당 단위로 state 값 변경
    onSelectUnit = (value) => {
        value == 0 ? this.setState({unit : 'cm'}) : this.setState({unit : 'in'});
    }

    render(){
        return (
            <View style={styles.container}>
                {/* 그림을 클릭하면 전체 안내선이 보이도록 */}
                <TouchableOpacity style={styles.imageBox} activeOpacity={1} onPress={() => this.setState({part : null})}>
                    {/* 안내선이 없는 전신 이미지를 배경이미지로 두어, 이미지 로딩 시 발생하는 깜박임 방지 */}
                    <ImageBackground style={styles.imageBackground} resizeMode='contain' source={require('../../assets/body/전신.png')} >
                        { this.state.part ?
                            <Image style={styles.bodyImage} resizeMode='contain' source={this.image[this.state.part]}/>
                            : <Image style={styles.bodyImage}  resizeMode='contain'source={require('../../assets/body/전신_선.png')}/>} 
                    </ImageBackground>
                </TouchableOpacity>     
                
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
                    <SizeByPart unit={this.state.unit} onPress={(part) => this.setState({ part : part })}/>
                </View>
            </View>
        );
    }
}
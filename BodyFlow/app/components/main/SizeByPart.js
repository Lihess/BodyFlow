// SizeByPart.js
// 부위별 사이즈를 위한 컴포넌트로, 각 단위에 맞춰 변환된 값으로 렌더링.

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { readSizeByPartsLatest } from '../../backend/Read';
import Record from '../modal/MeasurandRecord.js';
import styles from '../../styles/main/SizeByPart.Style.js';
import { common } from '../../styles/Common.Style.js';
import { cmToInch } from '../ChangeUnit'
import { NavigationEvents } from 'react-navigation';

export default class BodySize extends React.Component {
    state = {
        sizeParts : {'어깨' : null, '윗가슴' : null, '팔뚝' : null, '허리' : null,
                     '엉덩이' : null, '허벅지' : null, '종아리' : null},
        modalVisible : false,
        modalPart : null
    }

    // 부위별 사이즈의 사장 최근기록을 불러옴
    // componentWillMount의 사용을 권장하지 않으므로, 대신하여 componentdidMount 사용
    // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
    componentDidMount = () => {
        this.getData();
    }

    // 데이터를 불러옴
    getData = () => {
        readSizeByPartsLatest(result => {
            this.setState({sizeParts : result})
        })
    }

    // visible 값 변경
    toggleVisible = () => {
        this.setState({modalVisible : !this.state.modalVisible})
    }

    // 부위별 사이즈 박스를 눌렀을때 실행되는 함수
    onPress = (part) => {
        this.toggleVisible();

        this.props.onPress(part);
        this.setState({ modalPart : part });
    }

    // 입력한 사이즈에 변화가 생겼다면 데이터를 다시 불러옴.
    onChangeSize = () => {
        this.getData()
    }

    render(){
        const parts = ['어깨', '윗가슴', '팔뚝', '허리', '엉덩이', '허벅지', '종아리']
        
        return(
            <View>
                <NavigationEvents onDidFocus={this.getData}/>
                
                { parts.map((part, i) => {
                    return (
                        <TouchableOpacity style={this.state.modalPart == part ? styles.selectedBox : styles.box} key={i} onPress={() => this.onPress(part)}>
                            {/* Record.js에 part를 넘기기 위해서 */}
                            <Text style={styles.smallText}>{part}</Text>
                            <View style={common.textBoxEnd}>
                                {/* 기본 단위는 cm. inch로 변환해야할 경우 변환하여 렌더링 */
                                    this.props.unit == 'cm' ?
                                        <Text style={[styles.size, !this.state.sizeParts[part] ? common.empty : null]}>
                                            {!this.state.sizeParts[part] ? '0.0' : this.state.sizeParts[part]}
                                        </Text> :
                                        <Text style={[styles.size, !this.state.sizeParts[part] ? common.empty : null]}>
                                           {!this.state.sizeParts[part] ? '0.0' : cmToInch(this.state.sizeParts[part])}
                                        </Text>
                                }
                                <Text style={styles.smallText}> {this.props.unit}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
                
                <Record 
                    visible={this.state.modalVisible} 
                    part={this.state.modalPart} 
                    onBackdropPress={this.toggleVisible}
                    onSubmit={this.onChangeSize}/>
            </View>
        )
    }
}

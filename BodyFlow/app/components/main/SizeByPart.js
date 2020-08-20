// SizeByPart.js
// 부위별 사이즈를 위한 컴포넌트로, 각 단위에 맞춰 변환된 값으로 렌더링.

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { readSizeByPartsLatest } from '../../backend/Read';
import Record from '../modal/MeasurandRecord.js';
import styles from '../../styles/main/SizeByPart.Style.js';
import { common } from '../../styles/Common.Style.js';

export default class BodySize extends React.Component {
    state = {
        sizeParts : {'어깨' : null, '윗가슴' : null, '팔뚝' : null, '허리' : null,
                     '엉덩이' : null, '허벅지' : null, '종아리' : null},
        modalVisiable : false,
        modalPart : null
    }

    // 부위별 사이즈의 사장 최근기록을 불러옴
    // componentWillMount의 사용을 권장하지 않으므로, 대신하여 componentdidMount 사용
    // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
    componentDidMount = () => {
        readSizeByPartsLatest(result => {
            console.log(result)
            this.setState({sizeParts : result})
        })
    }

    // visible 값 변경
    toggleVisible = () => {
        this.setState({modalVisiable : !this.state.modalVisiable})
    }

    // 부위별 사이즈 박스를 눌렀을때 실행되는 함수
    onPress = (part) => {
        this.toggleVisible();
        this.setState({ modalPart : part });
    }

    onChangeSize = (part, size) => {
        const newSizeParts = this.state.sizeParts;
        newSizeParts[part] = size;

        this.setState({ sizeParts :  newSizeParts })
    }

    render(){
        const parts = ['어깨', '윗가슴', '팔뚝', '허리', '엉덩이', '허벅지', '종아리']
        
        return(
            <View>
                { parts.map((part, i) => {
                    return (
                        <TouchableOpacity style={styles.box} key={i} onPress={() => this.onPress(part)}>
                            {/* Record.js에 part를 넘기기 위해서 */}
                            <Text style={styles.smallText}>{part}</Text>
                            <View style={common.textBoxEnd}>
                                {/* 기본 단위는 cm. inch로 변환해야할 경우 변환하여 렌더링 */
                                    this.props.unit == 'cm' ?
                                        <Text style={[styles.size, this.state.sizeParts[part] == null ? common.empty : null]}>
                                            {this.state.sizeParts[part] == null ? '0.0' : this.state.sizeParts[part]}
                                        </Text> :
                                        <Text style={[styles.size, this.state.sizeParts[part] == null ? common.empty : null]}>
                                           {this.state.sizeParts[part] == null ? '0.0' : (this.state.sizeParts[part] / 2.54).toFixed(2)}
                                        </Text>
                                }
                                <Text style={styles.smallText}> {this.props.unit}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
                
                <Record 
                    visible={this.state.modalVisiable} 
                    part={this.state.modalPart} 
                    onBackdropPress={this.toggleVisible}
                    onSubmit={(part, size) => this.onChangeSize(part, size)}/>
            </View>
        )
    }
}

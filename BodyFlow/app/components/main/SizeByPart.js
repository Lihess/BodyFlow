// SizeByPart.js
// 부위별 사이즈를 위한 컴포넌트로, 각 단위에 맞춰 변환된 값으로 렌더링.

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import styles from '../styles/SizeByPart.Style.js';
import commonStyle from '../styles/Common.Style.js';

const sizeParts = [
    {
        part : '어깨',
        size : '15'
    },
    {
        part : '윗가슴',
        size : '15'
    },
    {
        part : '팔뚝',
        size : '155'
    },
    {
        part : '허리',
        size : '15'
    },
    {
        part : '엉덩이',
        size : '15'
    },
    {
        part : '허벅지',
        size : '15'
    },
    {
        part : '종아리',
        size : '15'
    }
]

export default class BodySize extends React.Component {
    state = {
        selectDay : new Date
    }

    render(){
        return(
            sizeParts.map(sizePart => {
                return (
                    <View style={styles.box}>
                        <Text style={styles.smallText}>{sizePart.part}</Text>
                        <View style={commonStyle.Textbox}>
                            {/* 기본 단위는 cm. inch로 변환해야할 경우 변환하여 렌더링 */
                                this.props.unit == 'cm' ?
                                    <Text style={styles.size}>{sizePart.size}</Text>
                                    : <Text style={styles.size}>{(sizePart.size / 2.54).toFixed(2)}</Text>
                            }
                            <Text style={styles.smallText}> {this.props.unit}</Text>
                        </View>
                    </View>
                );
            })
    )}
}

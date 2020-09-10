// Main.js

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper'
// https://github.com/leecade/react-native-swiper
import BodySize from '../components/main/BodySize.js';
import WeightAndFat from '../components/main/WeightAndFat.js';
import { FatProvider } from '../components/FatContext';
import { common } from '../styles/Common.Style';
import styles from '../styles/main/Main.Style'
import Gallery from '../components/main/Gallery.js';
export default class Main extends React.Component {
    static navigationOptions = { headerShown: false };

    render(){
        return (
            <SafeAreaView style={common.container}>
                <StatusBar backgroundColor={'#f1f1f1'} barStyle="dark-content"/>
                {/* state를 공유하는 컴포넌트 전체를 감싸야 함!! */}
                <FatProvider>
                    <Swiper style={styles.wrapper} paginationStyle={styles.dotPosition} activeDotColor={'orange'}>
                        <BodySize/>
                        <Gallery photos={this.props.navigation.state.params ? this.props.navigation.state.params.photos : []}/>
                    </Swiper>
                    <WeightAndFat/>
                </FatProvider>
            </SafeAreaView>
        );
    }
}
// AppNavigator.js
// 페이지 간 라우팅을 위한 클래스
// https://bangc.tistory.com/13
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainPage from '../pages/Main';
import ChartPage from '../pages/Chart';
import ImagePicker from '../pages/ImagePicker';
 
const AuthStack = createStackNavigator({
    MainPage : { screen : MainPage },
    ChartPage : { screen : ChartPage },
    ImagePicker : { screen : ImagePicker }
});
 
const AppNavigator = createSwitchNavigator(
    {
        Auth: AuthStack
    },
    {
        initialRouteName: 'Auth',
    }
);

export default createAppContainer(AppNavigator)
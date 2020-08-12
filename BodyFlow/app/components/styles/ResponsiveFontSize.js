// ResponsiveFontSize.js
// 화면 크기에 따라 폰트사이즈를 조정하기 위한 함수를 위한 파일
import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const scale = screenWidth / 320;

// 화면 크기에 따라 폰트사이즈를 조정하기 위한 함수
function normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

export {normalize, screenWidth};
import React from 'react';
import { Text } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

const Banner = ({datalen}) => {
    return(
        <AdMobBanner 
            style = { datalen == 0 ?
                    {position : 'absolute', bottom : 0, backgroundColor : '#f1f1f1' } 
                    : {paddingTop : 10, backgroundColor : '#f1f1f1' }} 
            bannerSize = "fullBanner"
            adUnitID = "ca-app-pub-6871296937188132/8638472578" 
        />  
    );
}
export default Banner;
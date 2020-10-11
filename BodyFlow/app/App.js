import React from 'react';
import { View } from "react-native";
import Navigation from './router/AppNavigator';
import { NavigationService } from './router/service';
import { createTables } from './backend/Create'
import { AdMobBanner } from 'expo-ads-admob';

class App extends React.Component {
    UNSAFE_componentWillMount(){
        createTables()
    }

    bannerError() {
        console.log('error')
        return;
    }

    render(){
        return( 
            
                <Navigation
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}/>
        
            
        );
    }
}

export default App
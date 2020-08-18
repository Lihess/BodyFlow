import React from 'react';
import Navigation from './router/AppNavigator';
import { NavigationService } from './router/service';
import { createTables } from './backend/Create'

export default class App extends React.Component {
    componentDidMount(){
        console.log('7')
        createTables()
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
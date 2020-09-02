import React from 'react';
import Navigation from './router/AppNavigator';
import { NavigationService } from './router/service';
import { createTables } from './backend/Create'

class App extends React.Component {
    componentDidMount(){
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

export default App
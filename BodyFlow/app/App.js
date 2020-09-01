import React from 'react';
import Navigation from './router/AppNavigator';
import { NavigationService } from './router/service';
import { createTables } from './backend/Create'
import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)

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

export default withAuthenticator(App, { includeGreetings: true })
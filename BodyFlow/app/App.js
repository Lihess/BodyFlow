import React from 'react';
import Navigation from './router/AppNavigator';
import { NavigationService } from './router/service';

export default function App() {
  return( 
    <Navigation
      ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
      }}/>
    );
}
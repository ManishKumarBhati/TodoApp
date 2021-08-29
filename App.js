/* eslint-disable no-alert */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ScreenNav from './ScreenNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <ScreenNav />
    </NavigationContainer>
  );
};
export default App;

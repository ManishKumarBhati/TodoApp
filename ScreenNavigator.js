import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from './Login';
import MyTabPager from './MyTabPager';

const Stack = createStackNavigator();

const ScreenNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: null,
        headerStyle: {
          backgroundColor: '#9AC4F8',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MyTabPager" component={MyTabPager} />
    </Stack.Navigator>
  );
};
export default ScreenNav;

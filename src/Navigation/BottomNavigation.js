import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screen/Home';
import DetailScreen from '../Screen/Detail';

const BottomNavigator = () => {
  const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='Home' component={HomeScreen} options={{title: 'ホーム'}}/>
      <Tab.Screen name='Detail' component={DetailScreen} options={{title: '明細'}}/>
    </Tab.Navigator>
  )
}

export default BottomNavigator;
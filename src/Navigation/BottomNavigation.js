import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screen/Home';
import EditScreen from '../Screen/Edit';

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
      <Tab.Screen name='Detail' component={EditScreen} options={{title: '明細'}}/>
    </Tab.Navigator>
  )
}

export default BottomNavigator;
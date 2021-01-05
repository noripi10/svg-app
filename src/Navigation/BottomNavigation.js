import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../Screen/Home';
import EditScreen from '../Screen/Edit';
import { AppContext } from '../Util/Common';

const BottomNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { state } = useContext(AppContext);

  return(
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'apple' : 'apple';
          } else if (route.name === 'Edit') {
            iconName = focused ? 'windows' : 'windows';
          }
          return <FontAwesome name={iconName} size={size} color={color}/>;
        },
        tabBarBadge: state.memoList.length,
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} options={{title: 'ホーム'}}/>
      <Tab.Screen name='Edit' component={EditScreen} options={{title: '明細'}}/>
    </Tab.Navigator>
  )
}

export default BottomNavigator;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import HomeScreen from '../Screen/Home';
import EditScreen from '../Screen/Edit';

const StackNavigator = () => {
  const Stack = createStackNavigator();

  return(
    <Stack.Navigator
      mode='modal'
      headerMode='screen'
      initialRouteName='Home'
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#1974e0'}
        
      }}
      HeaderBackButton={undefined}
    >
      <Stack.Screen name='Home' component={HomeScreen} options={{title: 'メモ一覧', headerBackTitle: ''}}/>
      <Stack.Screen name='Edit' component={EditScreen} options={{title: '編集', headerBackTitle: 'close', headerBackImage: null}}/>
    </Stack.Navigator>
  )
}

export default StackNavigator;
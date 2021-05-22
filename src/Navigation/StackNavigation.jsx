import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {EditScreen} from '../Screen/Edit';
import {HomeScreen} from '../Screen/Home';
import {LicenseScreen} from '../Screen/License';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      mode="modal"
      // headerMode="screen"
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#1974e0',
        },
      }}
      HeaderBackButton={undefined}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Edit"
        component={EditScreen}
        options={{
          title: 'メモ編集',
          headerStyle: {
            backgroundColor: '#4576f7',
          },
        }}
      />
      <Stack.Screen
        name="License"
        component={LicenseScreen}
        options={{
          title: '使用パッケージ一覧',
          headerStyle: {
            backgroundColor: '#212122',
          },
        }}
      />
    </Stack.Navigator>
  );
};

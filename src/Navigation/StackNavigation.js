import React , { useContext } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import HomeScreen from '../Screen/Home';
import EditScreen from '../Screen/Edit';
import { AppContext } from '../Util/Common';

const StackNavigator = () => {
  const Stack = createStackNavigator();
  const { state } = useContext(AppContext);

  return(
    <Stack.Navigator
      mode='modal'
      headerMode='screen'
      initialRouteName='Home'
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#1974e0',
          height: 60,
        }
        
      }}
      HeaderBackButton={undefined}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'メモ一覧',
          headerRight: (props) => (
            <Text style={{color: props.tintColor ,fontSize: 16}}>{state.memoList.length} 件    </Text>
          ),
        }}
      />
      <Stack.Screen
        name='Edit'
        component={EditScreen}
        options={{
          title: '編集', 
          headerBackTitle: 'close',
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator;
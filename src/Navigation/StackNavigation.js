import React , { useContext } from 'react';
import { Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import HomeScreen from '../Screen/Home';
import EditScreen from '../Screen/Edit';
import { AppContext } from '../Util/common';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
          // height: 60,
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
            <Text style={{color: props.tintColor ,fontSize: 16, marginRight: 15}}>
              <Text style={{color: props.tintColor ,fontSize: 22}}>{state.memoList.length}</Text> 件
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name='Edit'
        component={EditScreen}
        options={{
          title: '編集', 
          headerBackTitle: 'close',
          headerStyle: {
            backgroundColor: '#4576f7',
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator;
import React , { useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import BottomNavigator from './src/Navigation/BottomNavigation';
import StackNavigator from './src/Navigation/StackNavigation';
import { initState, reducer } from './src/Util/Reducer';
import { AppContext } from './src/Util/common';
import { useCameraPermision } from './src/Util/permission';

export default function App() {
  const theme = useTheme();
  const permissonCameraRoll = useCameraPermision();
  // console.log(permissonCameraRoll);

  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppContext.Provider value={{state, dispatch, permission: permissonCameraRoll}}>
      <NavigationContainer theme={theme}>
        {/* <BottomNavigator/> */}
        <StackNavigator/>
        <StatusBar style="auto" />
      </NavigationContainer>  
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

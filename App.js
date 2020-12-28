import React , { useEffect, useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './src/Navigation/BottomNavigation';
import StackNavigator from './src/Navigation/StackNavigation';
import { initState, reducer } from './src/Util/Reducer';
import { AppContext } from './src/Util/Common';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <AppContext.Provider value={{state, dispatch}}>
      <NavigationContainer>
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

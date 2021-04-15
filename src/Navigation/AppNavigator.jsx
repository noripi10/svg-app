import React from 'react';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {StackNavigator} from './StackNavigation';

export const AppNavigator = () => {
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <StackNavigator />
    </NavigationContainer>
  );
};

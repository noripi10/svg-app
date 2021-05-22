import {NavigationContainer, useTheme} from '@react-navigation/native';
import React from 'react';
import {StackNavigator} from './StackNavigation';

export const AppNavigator = () => {
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <StackNavigator />
    </NavigationContainer>
  );
};

import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TouchButton = ({onPress, name, iconName}) => (
  <TouchableOpacity 
    style={{
      backgroundColor: '#2473d6',
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      shadowColor: '#000',
      zIndex: 100,
    }}
    onPress={onPress}
  >
    <Text style={{color: '#fff'}}>{name}</Text>
  </TouchableOpacity>
)

export default TouchButton;
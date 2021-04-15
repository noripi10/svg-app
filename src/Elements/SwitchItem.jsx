import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

export const SwitchItem = ({color, currentStroke, setCurrentStroke}) => {
  return (
    <View style={styles.container}>
      <Text>赤</Text>
      <Switch
        trackColor={{false: '#000', true: color}}
        onValueChange={(preValue) => {
          if (!preValue) {
            setCurrentStroke('#000');
          } else {
            setCurrentStroke(color);
          }
        }}
        value={currentStroke === color ? true : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

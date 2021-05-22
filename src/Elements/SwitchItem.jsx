import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

export const SwitchItem = ({name, color, currentStroke, setCurrentStroke}) => {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Switch
        style={styles.switch}
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
  switch: {
    marginTop: 6,
    marginBottom: 16,
  },
});

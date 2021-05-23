import PropTypes from 'prop-types';
import React from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';

const TouchButton = ({onPress, name, animationValue}) => (
  <TouchableOpacity style={styles.touchButton} onPress={onPress}>
    <Animated.Text
      style={[
        styles.buttonText,
        {
          fontSize: animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [13, 15],
          }),
        },
      ]}>
      {name}
    </Animated.Text>
  </TouchableOpacity>
);

TouchButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  animationValue: PropTypes.instanceOf(Animated.Value),
};

const styles = StyleSheet.create({
  touchButton: {
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
  },
});

export default TouchButton;

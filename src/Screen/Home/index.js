import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = (params) => {

  return(
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>HomeScreen</Text>
      <Text>{JSON.stringify(params)}</Text>
      <Button title='navigate' onPress={() => params.navigation.navigate('Detail')}/>
    </View>
  )
}

export default HomeScreen;
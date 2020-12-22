import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, useWindowDimensions, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polyline, Rect, Circle } from 'react-native-svg';
const DetailScreen = (params) => {
  const [tmpPoints, setTmpPoints] = useState([]);
  const [points, setPoints] = useState([]);

  const window = useWindowDimensions();
  const navigation = useNavigation();
  useEffect(()=> {
    const unsubscribe = navigation.addListener('focus', (params) => {
      Alert.alert('focus');
    });
    return unsubscribe;

  },[navigation]);

  const handleTouchMove = (event) => {
    // console.log(JSON.stringify(event.nativeEvent));
    const { locationX, locationY, touches } = event.nativeEvent;
    setTmpPoints([...tmpPoints, {x: locationX, y: locationY}]);
    // console.log(points);
  }

  const handleTouchEnd = (event) => {

    setPoints(points.concat(tmpPoints || []));
    setTmpPoints([]);
  }

  const getStringPoints = () => {
    if(points.length){
      let stringPoints = '';
      points.forEach((v,i) => {
        stringPoints += Object.values(v).join() + ' ';
      });
      return stringPoints;
    }
    return '';
  }

  const getStringTmpPoints = () => {
    if(points.length){
      let stringPoints = '';
      tmpPoints.forEach((v,i) => {
        stringPoints += Object.values(v).join() + ' ';
      });
      return stringPoints;
    }
    return '';
  }
  return(
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        // style={{
        //   flex: 1,
        //   justifyContent: 'center',
        //   alignItems: 'center',
        // }}
      >
        <Text>DetailScreen</Text>
        <Text>{JSON.stringify(params)}</Text>
        <View
          onTouchMove={handleTouchMove}
          // onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          // onTouchCancel={handleTouchCancel}
        >
          <Svg
            height={window.height * 0.75} 
            width={window.width * 0.95}
            viewBox={`0 0 ${window.width * 0.95} ${window.height * 0.75}`}
            // style={{
            //   backgroundColor: '#c8cbca',
            //   borderColor: '#000',
            //   borderRadius: 5,
            // }}
          >
            <Rect
              x={0}
              y={0}
              width={window.width * 0.95}
              height={window.height * 0.75}
              stroke="#000"
              strokeWidth="1"
              fill="#fff"
            />
            <Circle cx={window.width / 2} cy={window.height / 2} r="45" stroke="blue" strokeWidth="2.5" fill="#2272bf" />
          
            <Polyline
              fill='none'
              stroke='#000'
              strokeWidth='3'
              points={getStringPoints()}
            />

            <Polyline
              fill='none'
              stroke='#000'
              strokeWidth='3'
              points={getStringTmpPoints()}
            />
          </Svg>
        </View>
        <Button title='clear polylines' onPress={() => setPoints([])}/>
      </View>
    </SafeAreaView>
  )
}

export default DetailScreen;
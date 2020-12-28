import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Alert, useWindowDimensions, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polyline, Rect, Circle } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppContext, getGuid } from '../../Util/Common';
import { useContext } from 'react';

const EditScreen = () => {
  const {state, dispatch} = useContext(AppContext);
  const [tmpPoints, setTmpPoints] = useState([]);
  const [points, setPoints] = useState([]);

  const window = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const refNew = useRef(!!route.params);

  let item = {};
  if (refNew){
    item = JSON.parse(route.params.item || '') || {};
  }

  useEffect(()=> {
    const unsubscribe = navigation.addListener('focus', (params) => {
    });
    return unsubscribe;
  },[navigation]);
  
  const handleTouchMove = (event) => {
    const { locationX, locationY, touches } = event.nativeEvent;
    setTmpPoints([...tmpPoints, {x: locationX, y: locationY}]);
  }

  const handleTouchEnd = (event) => {
    // 線一本を１オブジェクトとして保存
    const key = getGuid(),
          curPoints = [
            ...points,
            {
              key,
              list: tmpPoints,
            }
          ];
    setPoints(curPoints || []);
    setTmpPoints([]);
  }

  const getStringPoints = (ps) => {
    if(ps.length){
      let stringPoints = '';
      ps.forEach((v, i) => {
        stringPoints += Object.values(v).join() + ' ';
      });
      return stringPoints;
    }
    return '';
  }

  const getStringTmpPoints = () => {
    if(tmpPoints.length){
      let stringPoints = '';
      tmpPoints.forEach((v,i) => {
        stringPoints += Object.values(v).join() + ' ';
      });
      return stringPoints;
    }
    return '';
  }
  return(
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          alignItems: 'center',
        }}
      >
        {/* <Text>{JSON.stringify(params)}</Text> */}
        <View
          onTouchMove={handleTouchMove}
          // onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          // onTouchCancel={handleTouchCancel}
          style={{
            height: window.height * 0.75,
            width: window.width * 0.95,
          }}
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
            {/* <Circle cx={window.width / 2} cy={window.height / 2} r="45" stroke="blue" strokeWidth="2.5" fill="#2272bf" /> */}
          
            {/* <Polyline
              fill='none'
              stroke='#000'
              strokeWidth='3'
              points={getStringPoints()}
            /> */}

            {points.map((v, i) => (
              <Polyline
                key={v.key}
                fill='none'
                stroke='#000'
                strokeWidth='2'
                points={getStringPoints(v.list || [])}
              />
            ))}
            <Polyline
              fill='none'
              stroke='#000'
              strokeWidth='2'
              points={getStringTmpPoints()}
            />
          </Svg>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button title='clear polyline' onPress={() => setPoints([])}/>
          <Button title='save'/>
        </View>

      </View>
    </View>
  )
}

export default EditScreen;
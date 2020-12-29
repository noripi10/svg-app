import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Alert, useWindowDimensions, Button, Text } from 'react-native';
import Svg, { Polyline, Rect, Circle } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/native';
// import  from '@expo/vector-icons';
import { AppContext, getDate, getGuid, memoObject } from '../../Util/Common';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import style from './style';

const EditScreen = () => {
  const {state, dispatch} = useContext(AppContext);
  const [item, setItem] = useState(memoObject);
  const [currentStroke, setCurrentStroke] = useState('#000');
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState('2');
  const [currentPoints, setCurrentPoints] = useState([]);
  const refNew = useRef(true);

  const window = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if(route.params){
      try{
        const routeItem = route.params.item;
        refNew.current = false;
        setItem(routeItem);            
      }catch(e){
        console.log(e);
        Alert.alert('データ取得エラー');
        navigation.goBack();
      }    
    }
  },[]);

  useEffect(()=> {
    const unsubscribe = navigation.addListener('focus', (params) => {
    });
    return unsubscribe;
  },[navigation]);
  
  const handleTouchMove = (event) => {
    const { locationX, locationY, touches } = event.nativeEvent;
    setCurrentPoints([...currentPoints, {x: locationX, y: locationY}]);
  }

  const handleTouchEnd = (event) => {
    // 線一本を１オブジェクトとして保存
    try{
      setItem({
        ...item,
        lineList: [
          ...item.lineList,
          {
            key: getGuid(),
            seq: item.lineList.length,
            stroke: currentStroke,
            strokeWidth: currentStrokeWidth,
            points: currentPoints,
          }
        ]
      });
    }catch(e){
      console.log('error', e);
    }

    setCurrentPoints([]);
  }

  const handleChangeTitle = (title) => {
    setItem({
      ...item,
      title,
    })
  }

  const handleClearLine = () => {
    setItem({
      ...item,
      lineList: [],
    });
  }

  const handleSaveData = () => {
    dispatch({
      TYPE: 'ITEM_UPDATE',
      INSERT: refNew.current,
      ITEM: {
        ...item,
        id: refNew.current ? getGuid() : item.id,
        lastDate: getDate(),
      }
    });
    Alert.alert('保存しました');
  }

  const getPointsString = (points) => {
    if(points.length){
      let stringPoints = '';
      points.forEach((v, i) => {
        stringPoints += Object.values(v).join() + ' ';
      });
      return stringPoints;
    }
    return '';
  }

  const getCurrentPointsString = () => {
    if(currentPoints.length){
      let stringPoints = '';
      currentPoints.forEach((v,i) => {
        stringPoints += Object.values(v).join() + ' ';
      });
      return stringPoints;
    }
    return '';
  }

  return(
    <View
      style={style.container}
    >
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{width: window.width * 0.9, fontSize: 20, marginBottom: 8,}}
          placeholder='title'
          onChangeText={(text) => handleChangeTitle(text)}
          value={item.title}
        />
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

            {item.lineList && item.lineList.map((line, i) => (
              <Polyline
                key={line.key}
                fill='none'
                stroke={line.stroke}
                strokeWidth={line.strokeWidth}
                points={getPointsString(line.points || [])}
              />
            ))}
            <Polyline
              fill='none'
              stroke={currentStroke}
              strokeWidth={currentStrokeWidth}
              points={getCurrentPointsString()}
            />
          </Svg>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginRight: 20,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            marginRight: 20,
            width: 60,
            alignItems: 'center',
            backgroundColor: 'blue',
            borderRadius: 5,
          }}
          onPress={() => handleClearLine()}
        >
          <Text style={{color: '#fff'}}>クリア</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            width: 60,
            alignItems: 'center',
            backgroundColor: '#242424',
            borderRadius: 5,
          }}
          onPress={() => handleSaveData()}
        >
          <Text style={{color: '#fff'}}>保存</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditScreen;
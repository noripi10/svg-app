import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Alert, useWindowDimensions, Text, Modal, Switch } from 'react-native';
import Svg, { Polyline, Rect, Circle } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AppContext, getDate, getGuid, memoObject } from '../../Util/Common';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import style from './style';
import { useLayoutEffect } from 'react';

const EditScreen = () => {
  const {state, dispatch} = useContext(AppContext);
  const [item, setItem] = useState(memoObject);
  const [currentStroke, setCurrentStroke] = useState('#000');
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(2);
  const [currentPoints, setCurrentPoints] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [drawColor, setDrawColor] = useState('#000');
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <TouchableOpacity
          style={{marginLeft: 15}}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name='arrow-down' size={24} color='#fff'/>
        </TouchableOpacity>            
      ),
    })
  },[navigation, route]);

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

  const handleBackOne = () => {
    // const newLineList = item.lineList.pop();
    // setItem({
    //   ...item,
    //   lineList:[
    //     newLineList,
    //   ]
    // });
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
    navigation.goBack();
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
          style={{width: window.width * 0.9, fontSize: 16, marginBottom: 8,}}
          placeholder='メモタイトルを入力できます'
          onChangeText={(text) => handleChangeTitle(text)}
          value={item.title}
        />
        <View
          onTouchMove={handleTouchMove}
          // onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          // onTouchCancel={handleTouchCancel}
          style={{
            height: window.height * 0.7,
            width: window.width * 0.95,
          }}
        >
          <Svg
            height={window.height * 0.7} 
            width={window.width * 0.95}
            viewBox={`0 0 ${window.width * 0.95} ${window.height * 0.7}`}
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
              height={window.height * 0.7}
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
          // alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            justifyContent: 'center',
            marginLeft: 20,
          }}
        >
          <TouchableOpacity
            style={[style.button, {backgroundColor: 'green'}]}
            onPress={() => setDisplayModal(true)}
          >
            <Text style={{color: '#fff'}}>設定</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
            // marginRight: 0,
          }}
        >
          <TouchableOpacity
            style={[style.button, {backgroundColor: '#457af7'}]}
            onPress={() => handleClearLine()}
          >
            <Text style={{color: '#fff'}}>全クリア</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              padding: 10,
              marginRight: 15,
              height: 40,
              width: 70,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#92ace7',
              borderRadius: 5,
            }}
            onPress={() => handleBackOne()}
          >
            <Text style={{color: '#fff'}}>消しゴム</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[style.button, {backgroundColor: '#242424'}]}
            onPress={() => handleSaveData()}
          >
            <Text style={{color: '#fff'}}>保存</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* settingModal */}
      <Modal
        animationType='slide'
        visible={displayModal}
        transparent={true}
      >
        <View style={style.modalView}>
          <Text style={{alignSelf: 'flex-start', margin: 15, marginLeft: 40, fontSize: 15,}}>・色選択</Text>
          <View
            style={{
              width: 300,
              padding: 5,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >           
              <Text>黒</Text>
              <Switch
                trackColor={{ false: '#000', true: '#000'}}
                onValueChange={() => setCurrentStroke('#000')}
                value={currentStroke === '#000' ? true : false}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>赤</Text>
              <Switch
                trackColor={{ false: '#000', true: 'red'}}
                onValueChange={(preValue) => {              
                  if(!preValue){
                    setCurrentStroke('#000');
                  } else {
                    setCurrentStroke('red');
                  }
                }}
                value={currentStroke === 'red' ? true : false}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>青</Text>
              <Switch
                trackColor={{ false: '#000', true: 'blue'}}
                onValueChange={(preValue) => {
                  if(!preValue){
                    setCurrentStroke('#000');
                  } else {
                    setCurrentStroke('blue');
                  }
                }}
                value={currentStroke === 'blue' ? true : false}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              position: 'absolute',
              right: 10,
              bottom: 10,
            }}
          >
            <TouchableOpacity
              style={[style.button, {backgroundColor: '#bbb', marginBottom: 20}]}
              onPress={() => setDisplayModal(false)}
            >
              <Text>閉じる</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                margin:5,
                marginRight: 20,
                marginBottom: 20,
                width: 70,
                padding:15,
                alignItems: 'center',
                backgroundColor: '#ddd',
                borderRadius: 5,
              }}
              onPress={() => setDisplayModal(false)}
            >
              <Text>保存</Text>
            </TouchableOpacity> */}
          </View>
          <Text style={{alignSelf: 'flex-start', margin: 15, marginTop:100, marginLeft: 40, fontSize: 15,}}>・太さ</Text>
          <Slider
            style={{width: '70%', height: 40,}}
            minimumValue={1}
            maximumValue={10}
            step={1}
            onSlidingComplete={(val) => setCurrentStrokeWidth(val)}
            value={currentStrokeWidth}
          />
          <Text>{currentStrokeWidth}</Text>
        </View>
      </Modal>
    </View>
  )
}

export default EditScreen;
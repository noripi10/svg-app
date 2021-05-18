import React, {useEffect, useState, useContext, useRef, useLayoutEffect, useCallback} from 'react';
import {View, Alert, useWindowDimensions, Text, Modal, Switch, Platform} from 'react-native';
import Svg, {Polyline, Rect} from 'react-native-svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FontAwesome} from '@expo/vector-icons';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {captureRef} from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import {AdMobInterstitial, AdMobRewarded} from 'expo-ads-admob';

import {getDate, getGuid, getPixels, memoObject} from '../../Util/Common';
import {AppContext} from '../../Context/AppContext';
import {SwitchItem} from '../../Elements/SwitchItem';

import style from './style';

export const EditScreen = () => {
  const {state, dispatch, permissionCameraRoll, permissionAdmob} = useContext(AppContext);
  const [changed, setChanged] = useState(false);
  const [item, setItem] = useState(memoObject);
  const [currentStroke, setCurrentStroke] = useState('#000');
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(2);
  const [currentPoints, setCurrentPoints] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [drawColor, setDrawColor] = useState('#000');
  const refNew = useRef(true);
  const refViewShot = useRef(null);

  const window = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      try {
        const routeItem = route.params.item;
        refNew.current = false;
        setItem(routeItem);
      } catch (e) {
        Alert.alert('データ取得エラー');
        navigation.goBack();
      }
    }

    // AdMobRewarded.addEventListener('rewardedVideoDidPresent', () => {
    //   saveData();
    // });
    // return () => {
    //   AdMobRewarded.removeAllListeners();
    // };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (params) => {});
    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <TouchableOpacity style={{marginLeft: 15}} onPress={() => navigationGoBack()}>
          <FontAwesome name="arrow-down" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, route, changed]);

  const navigationGoBack = useCallback(() => {
    if (changed) {
      Alert.alert('内容が変更されています', '変更を破棄しますか？', [
        {
          text: 'いいえ',
          onPress: undefined,
          style: 'cancel',
        },
        {
          text: 'はい',
          onPress: () => navigation.goBack(),
          style: 'default',
        },
      ]);
    } else {
      navigation.goBack();
    }
  }, [changed]);

  const handleTouchMove = (event) => {
    const {locationX, locationY, touches} = event.nativeEvent;
    setCurrentPoints([...currentPoints, {x: locationX, y: locationY}]);
  };

  const handleTouchEnd = (event) => {
    // 線一本を１オブジェクトとして保存
    try {
      setItem({
        ...item,
        lineList: [
          ...item.lineList,
          {
            key: getGuid(),
            // writeDate: new Date(),
            seq: item.lineList.length,
            stroke: currentStroke,
            strokeWidth: currentStrokeWidth,
            points: currentPoints,
          },
        ],
      });
      setChanged(true);
    } catch (error2) {
      console.log({error2});
    }

    setCurrentPoints([]);
  };

  const handleChangeTitle = (title) => {
    setItem({
      ...item,
      title,
    });
    setChanged(true);
  };

  const handleClearLine = () => {
    const prevLineList = item.lineList.length || 0;
    setItem({
      ...item,
      lineList: [],
    });
    if (prevLineList !== 0) {
      setChanged(true);
    }
  };

  const handleBackOne = () => {
    // console.log(item);
    // const newLineList = item.lineList.map(line => {
    //   return {
    //     line,
    //     key: line.writeDate,
    //   }
    // }).sort((a, b) => {
    //   if (a.key < b.key) {
    //     return -1;
    //   } else {
    //     return 1;
    //   }
    // }).map(sortLine => {
    //   return sortLine.line;
    // }).pop();
    // setItem({
    //   ...item,
    //   lineList:[
    //     newLineList,
    //   ]
    // });
  };

  const saveData = (message = true) => {
    const timer = message ? 1500 : 0;

    dispatch({
      TYPE: 'ITEM_UPDATE',
      INSERT: refNew.current,
      ITEM: {
        ...item,
        id: refNew.current ? getGuid() : item.id,
        lastDate: getDate(),
      },
    });
    if (message) {
      // Alert.alert('保存しました');
    }
    navigation.goBack();
  };

  const handleAdmobPlay = async () => {
    // AdMobRewarded.setAdUnitID(
    //   __DEV__ ? 'ca-app-pub-3940256099942544/1712485313' : 'ca-app-pub-7379270123809470/6330724967'
    // );
    // await AdMobRewarded.requestAdAsync({servePersonalizedAds: permissionAdmob});
    // await AdMobRewarded.showAdAsync();

    // Display an interstitial
    const unitId = Platform.select({
      ios: __DEV__ ? 'ca-app-pub-3940256099942544/4411468910' : 'ca-app-pub-7379270123809470/2598757300',
      android: 'ca-app-pub-3940256099942544/1033173712',
    });
    await AdMobInterstitial.setAdUnitID(unitId);
    await AdMobInterstitial.requestAdAsync({servePersonalizedAds: permissionAdmob});
    await AdMobInterstitial.showAdAsync();
    saveData(false);
  };

  const handleSaveData = () => {
    // if (refNew.current && state.memoList.length > 2) {
    //   Alert.alert('広告の閲覧しますか？', '3件以上メモを保存には広告を閲覧してください。閲覧と同時に保存されます。', [
    //     {
    //       text: 'いいえ',
    //       onPress: undefined,
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'はい',
    //       onPress: () => handleAdmobPlay(),
    //       style: 'default',
    //     },
    //   ]);
    // } else {
    //   saveData();
    // }
    saveData();
  };

  const handleCapture = async () => {
    const pixels = getPixels();
    const result = await captureRef(refViewShot, {
      format: 'jpg',
      quality: 1,
      result: 'tmpfile',
      height: pixels,
      width: pixels,
    });
    MediaLibrary.saveToLibraryAsync(result).then(() => {
      Alert.alert('カメラロールにメモを保存しました。');
    });
  };

  const getPointsString = (points) => {
    if (points.length) {
      let stringPoints = '';
      points.forEach((v, i) => {
        stringPoints += Object.values(v).join() + ' ';
      });
      return stringPoints;
    }
    return '';
  };

  const getCurrentPointsString = () => {
    if (currentPoints.length) {
      let stringPoints = '';
      currentPoints.forEach((v, i) => {
        stringPoints += Object.values(v).join() + ' ';
      });
      return stringPoints;
    }
    return '';
  };

  return (
    <View style={style.container}>
      <View style={style.subContainer}>
        <View
          style={[
            style.titleContainer,
            {
              width: window.width,
            },
          ]}>
          <TextInput
            style={[style.textInput, {width: window.width * 0.8}]}
            placeholder="メモタイトルを入力できます"
            onChangeText={(text) => handleChangeTitle(text)}
            value={item.title}
          />
          {permissionCameraRoll && (
            <TouchableOpacity style={[style.button, {margin: 0, padding: 0}]} onPress={() => handleCapture()}>
              <FontAwesome name="save" color="#000" size={28} />
            </TouchableOpacity>
          )}
        </View>

        <View
          ref={refViewShot}
          onTouchMove={handleTouchMove}
          // onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          // onTouchCancel={handleTouchCancel}
          style={{
            height: window.height * 0.7,
            width: window.width * 0.95,
          }}>
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

            {item.lineList &&
              item.lineList.map((line, i) => (
                <Polyline
                  key={line.key}
                  fill="none"
                  stroke={line.stroke}
                  strokeWidth={line.strokeWidth}
                  points={getPointsString(line.points || [])}
                />
              ))}
            <Polyline
              fill="none"
              stroke={currentStroke}
              strokeWidth={currentStrokeWidth}
              points={getCurrentPointsString()}
            />
          </Svg>
        </View>
      </View>
      <View style={style.settingContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            justifyContent: 'center',
            marginLeft: 16,
          }}>
          <TouchableOpacity style={[style.button, {backgroundColor: 'green'}]} onPress={() => setDisplayModal(true)}>
            <Text style={{color: '#fff'}}>設定</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity style={[style.button, {backgroundColor: '#457af7'}]} onPress={() => handleClearLine()}>
            <Text style={{color: '#fff'}}>全クリア</Text>
          </TouchableOpacity>
          <View style={{marginHorizontal: 10}} />
          {/* <TouchableOpacity
            style={[style.button, {backgroundColor: '#92ace7'}]}
            onPress={() => handleBackOne()}
          >
            <Text style={{color: '#fff'}}>戻す</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={[style.button, {backgroundColor: '#242424'}]} onPress={() => handleSaveData()}>
            <Text style={{color: '#fff'}}>保存</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="slide" visible={displayModal} transparent={true}>
        <View style={style.modalView}>
          <Text style={style.modalTitle}>・色選択</Text>
          <View style={style.modalSwitchContainer}>
            <SwitchItem name="黒" color="#000" {...{currentStroke, setCurrentStroke}} />
            <SwitchItem name="赤" color="red" {...{currentStroke, setCurrentStroke}} />
            <SwitchItem name="青" color="blue" {...{currentStroke, setCurrentStroke}} />
            <SwitchItem name="緑" color="green" {...{currentStroke, setCurrentStroke}} />
          </View>
          <Text style={style.modalTitle}>・太さ</Text>
          <Slider
            style={{width: '80%', height: 40}}
            minimumValue={1}
            maximumValue={10}
            step={1}
            onSlidingComplete={(val) => setCurrentStrokeWidth(val)}
            value={currentStrokeWidth}
          />
          <Text>{currentStrokeWidth}</Text>
          <View style={style.modalCloseContainer}>
            <TouchableOpacity
              style={[style.button, {backgroundColor: '#bbb', marginBottom: 20}]}
              onPress={() => setDisplayModal(false)}>
              <Text>閉じる</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

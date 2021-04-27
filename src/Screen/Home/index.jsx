import React, {useEffect, useContext, useRef} from 'react';
import {View, Text, Dimensions, Animated, InteractionManager, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {AdMobBanner} from 'expo-ads-admob';

import {AppContext} from '../../Context/AppContext';
import TouchButton from '../../Elements/TouchButton';
import Separator from '../../Elements/Separator';
import {MemoListItem} from '../../Elements/MemoListItem';

import {getDate, storage, getGuid} from '../../Util/Common';
import style from './style';

export const HomeScreen = () => {
  const animationValue = useRef(new Animated.Value(0)).current;

  const {state, dispatch, permissionAdmob} = useContext(AppContext);

  const navigation = useNavigation();

  const navigateEditScreen = async () => {
    animationValue.setValue(0);
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();

    InteractionManager.runAfterInteractions(async () => {
      navigation.navigate('Edit');
      await new Promise((resolve) => {
        setTimeout(() => {
          animationValue.setValue(0);
          resolve('ok');
        }, 1500);
      });
    });
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'メモ一覧',
      headerRight: () => {
        return (
          <Text style={{color: '#fff', marginRight: 16}}>
            <Text style={{fontSize: 20}}>{state.memoList.length || 0}</Text> 件
          </Text>
        );
      },
      // headerLeft: () => (
      //   <TouchableOpacity onPress={() => navigation.navigate('License')}>
      //     <Text style={{color: '#fff'}}>{'　使用パッケージ'}</Text>
      //   </TouchableOpacity>
      // ),
    });
  }, [state]);

  useEffect(() => {
    let isUnmounted = false;
    const funcInit = async () => {
      try {
        let result = await storage.load({key: 'memoList'});
        if (!isUnmounted && result) {
          dispatch({
            TYPE: 'DATA_INIT',
            memoList: result,
          });
        } else {
          dispatch({
            TYPE: 'DATA_INIT',
            memoList: [],
          });
        }
        // test_data
        const testList = [
          {
            id: 'memo_' + getGuid(),
            title: 'test_title_a',
            lastDate: getDate(),
            lineList: [
              // {
              //   lineId: 'line_' + getGuid(),
              //   index: 1,
              //   color: '#000',
              //   weight: 2,
              //   points: [],
              // },
            ],
          },
          {
            id: 'memo_' + getGuid(),
            title: 'test_title_b',
            lastDate: getDate(),
            lineList: [
              // {
              //   lineId: 'line_' + getGuid(),
              //   index: 1,
              //   color: '#000',
              //   weight: 2,
              //   points: [],
              // },
            ],
          },
        ];
        // テストでデータ作成と登録
        // dispatch({
        //   TYPE: 'DATA_INIT_TEST',
        //   memoList: testList,
        // });
      } catch (e) {
        console.log(e);
        if (!isUnmounted) {
          dispatch({
            TYPE: 'DATA_INIT_FIRST',
            memoList: [],
          });
        }
      }
    };
    funcInit();

    return () => (isUnmounted = true);
  }, []);

  const handleDeleteItem = (id) => {
    Alert.alert('削除しますか？', '', [
      {
        text: 'いいえ',
        onPress: undefined,
        style: 'cancel',
      },
      {
        text: 'はい',
        onPress: () =>
          dispatch({
            TYPE: 'ITEM_DELETE',
            ID: id,
          }),
        style: 'default',
      },
    ]);
  };

  const renderItem = ({item, index}) => {
    return <MemoListItem {...{navigation, item, index, handleDeleteItem}} />;
  };

  return (
    <>
      <View style={style.container}>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID={
            __DEV__
              ? 'ca-app-pub-3940256099942544/2934735716' // test
              : 'ca-app-pub-7379270123809470/3869103803'
          }
          servePersonalizedAds={permissionAdmob}
          onDidFailToReceiveAdWithError={(err) => console.log(err)}
        />
        {/* <View style={{height: 100}}>
        </View> */}
        {state.memoList && state.memoList.length ? (
          <View>
            <FlatList
              data={state.memoList}
              renderItem={renderItem}
              keyExtractor={(item, index) => 'row_' + item.id}
              ItemSeparatorComponent={() => <Separator />}
            />
          </View>
        ) : (
          <View style={style.noDataMessageContainer}>
            <Text style={{color: '#000', fontSize: 16}}>新規メモを作成してください → </Text>
          </View>
        )}
        <View style={style.newIconContainer}>
          <TouchButton name="New" onPress={navigateEditScreen} animationValue={animationValue} />
        </View>
      </View>
    </>
  );
};

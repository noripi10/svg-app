import React, {useEffect, useContext} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {AdMobBanner, AdMobInterstitial, AdMobRewarded} from 'expo-ads-admob';

import {AppContext} from '../../Context/AppContext';
import TouchButton from '../../Elements/TouchButton';
import Separator from '../../Elements/Separator';
import {MemoListItem} from '../../Elements/MemoListItem';

import {getDate, storage, getGuid} from '../../Util/Common';
import style from './style';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const {state, dispatch} = useContext(AppContext);

  const navigateEditScreen = async () => {
    if (state.memoList.length) {
      AdMobRewarded.setAdUnitID(
        __DEV__
          ? 'ca-app-pub-3940256099942544/1712485313'
          : 'ca-app-pub-7379270123809470/6330724967'
      );
      await AdMobRewarded.requestAdAsync();
      await AdMobRewarded.showAdAsync();
    }

    navigation.navigate('Edit');
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
    dispatch({
      TYPE: 'ITEM_DELETE',
      ID: id,
    });
  };

  const renderItem = ({item, index}) => {
    return <MemoListItem {...{navigation, item, index, handleDeleteItem}} />;
  };

  return (
    <View style={style.container}>
      {state.memoList && state.memoList.length ? (
        <View>
          <FlatList
            style={{flex: 1, width: Dimensions.get('window').width}}
            data={state.memoList}
            renderItem={renderItem}
            keyExtractor={(item, index) => 'row_' + item.id}
            ItemSeparatorComponent={() => <Separator />}
          />
        </View>
      ) : (
        <View style={style.noDataMessageContainer}>
          <Text style={{color: '#000', fontSize: 16}}>
            新規メモを作成してください →{' '}
          </Text>
        </View>
      )}
      <View style={style.newIconContainer}>
        <TouchButton name="New" onPress={navigateEditScreen} />
      </View>
      <AdMobBanner
        style={{position: 'absolute', bottom: 0}}
        bannerSize="fullBanner"
        adUnitID={
          __DEV__
            ? 'ca-app-pub-3940256099942544/2934735716' // test
            : 'ca-app-pub-7379270123809470/3869103803'
        }
        servePersonalizedAds
        onDidFailToReceiveAdWithError={(err) => console.log(err)}
      />
    </View>
  );
};

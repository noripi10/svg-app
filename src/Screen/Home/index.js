import React, {useEffect, useContext} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {getDate, storage, getGuid} from '../../Util/Common';
import TouchButton from '../../Elements/TouchButton';
import Separator from '../../Elements/Separator';
import {MemoListItem} from '../../Elements/MemoListItem';
import style from './style';
import {AppContext} from '../../Context/AppContext';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const {state, dispatch} = useContext(AppContext);

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
    return (
      <MemoListItem
        navigation={navigation}
        item={item}
        index={index}
        handleDeleteItem={handleDeleteItem}
      />
    );
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
        <TouchButton name="New" onPress={() => navigation.navigate('Edit')} />
      </View>
    </View>
  );
};

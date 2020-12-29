import React, {useEffect, useContext} from 'react';
import { View, Text, Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AppContext, getDate, storage, getGuid } from '../../Util/Common';
import TouchButton from '../../Elements/TouchButton';
import Separator from '../../Elements/Separator';
import style from './style';

const HomeScreen = (params) => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const func = async() => {
      try{
        let result = await storage.load({key: 'memoList'});
        if (result) {
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
            ]
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
            ]
          },
        ];

        // テストでデータ作成と登録
        // dispatch({
        //   TYPE: 'DATA_INIT_TEST',
        //   memoList: testList,
        // });

      }catch(e){
        console.log(e);
        dispatch({
          TYPE: 'DATA_INIT_FIRST',
          memoList: [],
        });
      }
    }
    func();
  },[]);

  const handleDeleteItem = (id) => {
    dispatch({
      TYPE: 'ITEM_DELETE',
      ID: id,
    });
  }

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          height: 60,
          width: Dimensions.get('window').width,
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          paddingLeft: 10,
          backgroundColor: (index % 2 === 0  || index === 0) ? '#ccc' : '#eee',
        }}
      >
        <TouchableOpacity
          onPress={() => {navigation.navigate('Edit', {item})}}
        >
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5}}>{item.title}</Text>
          <Text style={{fontSize: 15, fontWeight: 'normal'}}>{item.lastDate}</Text>
        </TouchableOpacity>
        <View
          style={{position: 'absolute', right : 10}}
        >
          <TouchableOpacity
            style={{backgroundColor: 'red', width: 45, alignItems: 'center', padding: 10, zIndex: 10, borderRadius: 5}}
            onPress={() => handleDeleteItem(item.id)}
          >
            <FontAwesome name='trash-o' size={20} color='#fff'/>
          </TouchableOpacity> 
        </View>
      </View>
    )
  }

  return(
    <View
      style={style.container}
    >
    {state.memoList && state.memoList.length
      ?
      <View>
        <FlatList
          style={{flex :1, width: Dimensions.get('window').width,}}
          data={state.memoList}
          renderItem={renderItem}
          keyExtractor={(item, index) => 'row_' + item.id}
          ItemSeparatorComponent={() => <Separator/>}
        />
      </View>
      : 
      <View
        style={{
          position: 'absolute',
          bottom: 60,
          right: 90,
          zIndex: 100,
        }}
      >
        <Text style={{color: '#000', fontSize: 16}}>新規メモを作成してください → </Text>
      </View>
    }        
      <View
        style={{
          position: 'absolute',
          bottom: 45,
          right: 35,
        }}
      >
        <TouchButton name='New' onPress={() => navigation.navigate('Edit')}/>
      </View>

    </View>
  )
}

export default HomeScreen;
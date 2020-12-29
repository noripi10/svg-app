import React, {useEffect} from 'react';
import { View, Text, Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AppContext, getDate, storage, getGuid } from '../../Util/Common';
import Separator from '../../Elements/Separator';

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
          TYPE: 'DATA_INIT_TEST',
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
          height: 50,
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
          <Text>{item.id} </Text>
          <Text>{item.title}</Text>
          <Text>{item.lastDate}</Text>
        </TouchableOpacity>
        <View
          style={{position: 'absolute', right : 10}}
        >
          <TouchableOpacity
            style={{backgroundColor: 'red', padding: 10, zIndex: 10, borderRadius: 20}}
            onPress={() => handleDeleteItem(item.id)}
          >
            <Text style={{color: 'white'}}>Delete</Text>
          </TouchableOpacity> 
        </View>
      </View>
    )
  }

  return(
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <View>
        <Text style={{fontSize: 20}}>保存リスト</Text>
        <FlatList
          style={{flex :1, width: Dimensions.get('window').width,}}
          data={state.memoList}
          renderItem={renderItem}
          keyExtractor={(item, index) => 'row_' + item.id}
          ItemSeparatorComponent={() => <Separator/>}
        />
        {/* <Button title='clear' onPress={() => dispatch({TYPE: 'DATA_CLEAR'})}/> */}
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 35,
          right: 30,
        }}
      >
        <TouchableOpacity 
          style={{
            backgroundColor: '#d05d68',
            width: 50,
            height: 50,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
          onPress={() => navigation.navigate('Edit')}
        >
          <Text style={{color: '#fff'}}>New</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default HomeScreen;
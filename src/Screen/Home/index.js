import React, {useEffect} from 'react';
import { View, Text, Button, Alert, Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AppContext } from '../../Util/Common';
import { storage, getGuid } from '../../Util/Common';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

const HomeScreen = (params) => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const func = async() => {
      try{
        let result = await storage.load({key: 'memoList'});
        if (result) {
          console.log(result);
          dispatch({
            TYPE: 'DATA_INIT',
            memoList: result,
          });
        } else {
          // dispatch({
          //   TYPE: 'DATA_INIT',
          //   memoList: [
          //     {id: 'a', title: 'title_a', lastDate: new Date(), lines: []},
          //     {id: 'a', title: 'title_a', lastDate: new Date(), lines: []},
          //     {id: 'a', title: 'title_a', lastDate: new Date(), lines: []},
          //   ],
          // });
        }
        dispatch({
          TYPE: 'DATA_INIT',
          memoList: [
            {id: getGuid(), title: 'title_a', lastDate: new Date(), lines: []},
            {id: getGuid(), title: 'title_a', lastDate: new Date(), lines: []},
            {id: getGuid(), title: 'title_a', lastDate: new Date(), lines: []},
          ],
        });

      }catch(e){
        console.log(e);
        dispatch({
          TYPE: 'DATA_INIT',
          memoList: [],
        });
      }
    }
    func();
  },[]);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          height: 50,
          width: Dimensions.get('window').width * 0.95,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => {navigation.navigate('Edit', {item: JSON.stringify(item)})}}
        >
          <Text>{item.id + '  ' + item.title + '  ' + item.lastDate.toString()} </Text>
        </TouchableOpacity>      
      </View>
    )
  }
  return(
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View>
        <Text>保存リスト</Text>
        <FlatList
          style={{flex :1, width: Dimensions.get('window').width , backgroundColor: '#ddd'}}
          data={state.memoList}
          renderItem={renderItem}
          keyExtractor={(item, index) => 'row_' + item.id}
          ItemSeparatorComponent={() => (
            <View style={{width: '100%', height: 0.5, backgroundColor: '#000'}}/>
          )}
        />
        <Button title='clear' onPress={() => dispatch({TYPE: 'DATA_CLEAR'})}/>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 40,
          right: 35,
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
          <Text style={{color: '#fff'}}>新規</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default HomeScreen;
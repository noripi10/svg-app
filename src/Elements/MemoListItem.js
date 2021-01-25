import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesome} from '@expo/vector-icons';

export const MemoListItem = ({navigation, item, index, handleDeleteItem}) => {
  return (
    <View
      style={[
        style.renderItemContainer,
        {
          backgroundColor:
            index % 2 === 0 || index === 0 ? '#e2f8fe' : '#f5fdff',
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Edit', {item});
        }}>
        <Text style={style.title}>{item.title}</Text>
        <Text style={style.updateDate}>{item.lastDate}</Text>
      </TouchableOpacity>
      <View style={style.deleteItemContainer}>
        <TouchableOpacity
          style={style.deleteIcon}
          onPress={() => handleDeleteItem(item.id)}>
          <FontAwesome name="trash-o" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  renderItemContainer: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  updateDate: {
    fontSize: 15,
    fontWeight: 'normal',
  },
  deleteItemContainer: {
    position: 'absolute',
    right: 10,
  },
  deleteIcon: {
    backgroundColor: '#f75d45',
    width: 45,
    alignItems: 'center',
    padding: 10,
    zIndex: 10,
    borderRadius: 5,
  },
  noDataMessageContainer: {
    position: 'absolute',
    bottom: 60,
    right: 90,
    zIndex: 100,
  },
  newIconContainer: {
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
});

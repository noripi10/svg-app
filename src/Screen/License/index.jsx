import React, {useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import LICENSE from '../../../assets/license.json';

const _renderItem = ({item, index}) => {
  return (
    <View style={styles.renderContainer}>
      <View style={styles.itemHeader}>
        <Text style={styles.h1}>{item.name}</Text>
        <Text>({item.version})</Text>
      </View>
      <Text>{item.license}</Text>
      {/* <Text>{item.repository}</Text>
      <Text>{item.author}</Text>
      <Text>{item.homepage}</Text>
      <Text>{item.dependencyLabel}</Text> */}
    </View>
  );
};

export const LicenseScreen = ({}) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <TouchableOpacity
          style={{marginLeft: 15}}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-down" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={LICENSE}
        renderItem={_renderItem}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  renderContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: 64,
    padding: 6,
  },
  separator: {
    width: '100%',
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
  },
  itemHeader: {
    flexDirection: 'row',
  },
  h1: {
    fontWeight: 'bold',
  },
});

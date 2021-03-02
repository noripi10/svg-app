import {StyleSheet} from 'react-native';

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
    bottom: 100,
    right: 90,
    zIndex: 100,
  },
  newIconContainer: {
    position: 'absolute',
    bottom: 80,
    right: 30,
  },
});

export default style;

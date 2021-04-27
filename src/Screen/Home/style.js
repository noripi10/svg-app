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
    bottom: 40,
    right: 85,
    zIndex: 1,
  },
  newIconContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
});

export default style;

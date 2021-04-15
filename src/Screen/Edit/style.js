import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 16,
  },
  subContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginTop: '75%',
    marginBottom: '13%',
    paddingTop: 35,
    backgroundColor: '#bce4f1',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    alignSelf: 'flex-start',
    margin: 15,
    marginLeft: 40,
    fontSize: 15,
  },
  modalSwitchContainer: {
    width: 300,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  modalCloseContainer: {
    flexDirection: 'row',
    margin: 10,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  textInput: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    height: 40,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default style;

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  inputText: {
    fontSize: 20,
    borderColor: 'grey',
    margin: 10,
    padding: 5,
    width: '90%',
    borderWidth: 2,
    borderRadius: 10,
  },
  loginView: {
    alignItems: 'center',
  },
  text: {
    margin: 5,
    padding: 5,
  },
  button: {
    margin: 10,
    borderRadius: 100,
  },
  card: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  alertMainView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 2,
    // flexDirection: 'row',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
});

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
    elevation: 10,
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4423',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;

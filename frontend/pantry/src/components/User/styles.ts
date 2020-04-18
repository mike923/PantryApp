import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
  },
  buttonText: {
    color: 'white',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  h1: {
    fontSize: 24,
  },
  h1View: {
    // shadowOpacity: .9,
    // shadowRadius: 1,
    borderBottomWidth: 3,
    borderColor: 'grey',
    borderLeftWidth: 2,
    borderRadius: 5,
    borderRightWidth: 0.25,
    borderTopWidth: 0.25,
    marginBottom: 10,
    padding: 8,
    shadowColor: 'red',
    shadowOffset: { height: 1, width: -1 },
  },
  p: {
    fontSize: 16,
    marginBottom: 10,
    padding: 5,
  },
});

export default styles;

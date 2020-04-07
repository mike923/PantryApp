import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  p: {
    marginBottom: 10,
    padding: 5,
    fontSize: 16,
  },
  h1: {
    fontSize: 24,
  },
  h1View: {
    // shadowOpacity: .9,
    // shadowRadius: 1,
    shadowColor: 'red',
    shadowOffset: { height: 1, width: -1 },
    borderLeftWidth: 2,
    borderBottomWidth: 3,
    borderTopWidth: 0.25,
    borderRightWidth: 0.25,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
});

export default styles;

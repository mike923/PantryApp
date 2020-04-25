import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 100,
    borderWidth: 1,
    bottom: 10,
    height: 70,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    width: 70,
    zIndex: 90,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  displayContainer: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    color: 'white',
    flex: 0,
    fontSize: 40,
    margin: 20,
    padding: 15,
    paddingHorizontal: 20,
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
  },
  //   welcome: {
  //     fontSize: 20,
  //     textAlign: 'center',
  //     margin: 10,
  //   },
  //   instructions: {
  //     textAlign: 'center',
  //     color: '#333333',
  //     marginBottom: 5,
  //   },
});

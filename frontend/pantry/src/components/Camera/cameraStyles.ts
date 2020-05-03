import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
  barcode: {
    backgroundColor: 'white',
    borderRadius: 50,
    marginLeft: windowWidth / 12,
  },
  camera: {
    marginLeft: windowWidth / 15,
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
  flash: {
    bottom: windowHeight - 150,
    right: 0,
  },
  icon: {
    alignSelf: 'center',
    color: 'white',
    flex: 0,
    fontSize: 40,
    margin: 20,
    padding: 5,
    // paddingHorizontal: 20,
  },
  iconView: {
    // alignItems: 'stretch',
    flex: 1,
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
  },
  zoom: {
    bottom: windowHeight - 190,
    left: 2,
    width: 140,
  },
});

export const colors = {
  primaryColor: '#1e88e5',
  secondaryColor: '#005cb2',
  editButtonColor: '#039be5',
  deleteButtonColor: '#6ab7ff',
};

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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    left: windowWidth - 250,
    shadowColor: '#F02A4B',
    shadowOffset: { height: 10, width: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  camera: {
    bottom: 0,
    marginBottom: windowHeight / 60,
    marginLeft: windowWidth / 50,
    position: 'absolute',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#FF3974',
    borderRadius: 6,
    display: 'flex',
    height: 60,
    justifyContent: 'center',
    shadowColor: '#2AC062',
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 25,
  },
  closeText: {
    color: '#00479e',
    fontSize: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 10,
  },
  displayContainer: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  flash: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  floatingButtonContainer: {
    alignItems: 'center',
    position: 'absolute',
    right: 40,
  },
  icon: {
    alignSelf: 'center',
    color: 'white',
    flex: 0,
    fontSize: 40,
    margin: 20,
    padding: 5,
  },
  iconView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalImg: {
    height: 450,
    marginBottom: 10,
    marginTop: '5%',
    width: '100%',
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
  },
  productTitle: {
    fontSize: 22,
    textAlign: 'center',
  },
  scrollView: {
    height: '30%',
    marginHorizontal: 20,
  },
  zoom: {
    left: 0,
    position: 'absolute',
    top: 0,
    width: 140,
  },
});

export const colors = {
  editButtonColor: '#039be5',
  deleteButtonColor: '#6ab7ff',
  primaryColor: '#1e88e5',
  secondaryColor: '#005cb2',
};

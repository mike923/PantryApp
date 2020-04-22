import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const dashBoardStyles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(28,42,56,0.8)',
    borderRadius: 100,
    height: 40,
    marginLeft: 22,
    marginTop: 25,
    opacity: 0.76,
    width: 40,
  },
  container: {
    backgroundColor: '#1c2a38',
    height: 400,
    width: windowWidth,
  },
  edit_button: {
    alignSelf: 'center',
    color: '#8596a3',
    fontSize: 14,
    lineHeight: 20,
  },
  edit_profile: {
    borderColor: '#8596a3',
    borderRadius: 100,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    left: 254,
    position: 'absolute',
    top: 141,
    width: 100,
  },
  image: {
    height: 132,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  image2: {
    borderColor: '#1c2a38',
    borderRadius: 100,
    borderWidth: 5,
    height: 90,
    left: 12,
    position: 'absolute',
    top: 91,
    width: 90,
  },
  imageStack: {
    height: 181,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  imageStackStack: {
    height: 181,
  },
  image_imageStyle: {},
  location: {
    color: '#798894',
    fontSize: 16,
    height: 20,
    lineHeight: 20,
    width: 130,
  },
  location_container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 20,
    justifyContent: 'space-between',
    width: 150,
  },
  metadata: {
    flexDirection: 'row',
    height: 20,
    justifyContent: 'center',
    marginLeft: 22,
    marginRight: 40,
    marginTop: 98,
  },
  time: {
    color: '#798894',
    fontSize: 16,
    lineHeight: 20,
  },
  time_container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 20,
    justifyContent: 'space-between',
    marginLeft: 16,
    width: 170,
  },
  welcome: {
    color: 'rgba(255,255,255,1)',
    fontSize: 24,
    lineHeight: 20,
    marginLeft: 60,
    marginTop: -82,
  },
});

import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
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
    // backgroundColor: '#1c2a38',
    height: '30%',
    width: '100%',
  },
  edit_button: {
    alignSelf: 'center',
    color: '#8596a3',
    fontSize: 14,
    lineHeight: 20,
  },
  image: {
    height: 402,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  imageStack: {
    height: 181,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  imageStackContainer: {
    height: 149,
  },
  location: {
    color: 'white',
    fontSize: 16,
    height: 20,
    lineHeight: 20,
    width: 130,
  },
  metadata: {
    flex: 1,
    flexDirection: 'row',
    height: 20,
    justifyContent: 'center',
    marginLeft: 22,
    marginRight: 40,
    // marginTop: 98,
  },
  navContainer: {
    backgroundColor: '#fff',
    flex: 1,
    height: 600,
    paddingTop: 5,
    position: 'relative',
  },
  time: {
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
  },
  welcome: {
    alignSelf: 'center',
    bottom: '48%',
    color: 'rgba(255,255,255,1)',
    fontSize: 24,
    height: 50,
    lineHeight: 30,
  },
});

export const dashBoardStyles = StyleSheet.create({
  buttonText: { color: 'black', fontSize: 18, fontWeight: 'bold' },
  container: {
    height: '100%',
  },
  nav_button: {
    backgroundColor: '#fcf7f4',
    borderRadius: 1,
    marginVertical: 1,
    padding: 12,
    width: '100%',
    zIndex: 9,
    paddingLeft: 25,
  },
});

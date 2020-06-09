import { StyleSheet } from 'react-native';

export const cartStyles = StyleSheet.create({
  instructions: {
    alignSelf: 'center',
    borderBottomWidth: 3,
    bottom: 6,
    color: 'black',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingBottom: 5,
    textAlign: 'center',
    width: '95%',
  },
});

export const actionButtonStyles = StyleSheet.create({
  addButton: {
    backgroundColor: '#92b9a4',
  },
  button: {
    alignItems: 'center',
    borderRadius: 60 / 2,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    shadowColor: '#F02A4B',
    shadowOffset: { height: 10, width: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    width: 60,
  },
  deleteButton: {
    backgroundColor: '#ee6e73',
  },
  deleteIcon: {
    color: 'white',
    fontSize: 26,
  },
  floatingButtonContainer: {
    alignItems: 'center',
    position: 'absolute',
    right: 40,
  },
  menu: {
    backgroundColor: '#F02A4B',
  },
  secondary: {
    backgroundColor: '#FFF',
    borderRadius: 48 / 2,
    height: 48,
    width: 48,
  },
});

export const emptyCart = StyleSheet.create({
  cameraLaunchButton: {
    alignItems: 'center',
    backgroundColor: 'rgb(255, 92, 97)',
    borderRadius: 5,
    elevation: 2,
    height: 58,
    justifyContent: 'center',
    marginTop: 90,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    width: 292,
  },
  cameraLaunchButtonText: {
    color: 'black',
    fontSize: 20,
  },
  emptyCartContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  primaryText: {
    color: 'black',
    fontSize: 44,
    position: 'absolute',
  },
  secondaryText: {
    color: 'black',
    fontSize: 35,
    top: '5%',
  },
  svgImg: {
    height: 310,
    width: 320,
  },
});

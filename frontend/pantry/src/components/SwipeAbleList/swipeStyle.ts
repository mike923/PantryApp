import { StyleSheet, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

export const swipeStyles = StyleSheet.create({
  leftButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 7,
    paddingHorizontal: 18,
    paddingVertical: 23,
    backgroundColor: '#50f442',
    position: 'absolute',
    elevation: 3,
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    marginHorizontal: 5,
    marginTop: 30,
    elevation: 3,
  },
  textContainer: {
    paddingHorizontal: 30,
    paddingVertical: 35,
    width: SCREEN_WIDTH / 1.03,
    borderRadius: 7,
    backgroundColor: '#CFD8DC',
    elevation: 3,
    zIndex: 2,
  },
  textStyle: {
    fontSize: 17,
  },
  rightButtonContainer: {
    position: 'absolute',
    left: SCREEN_WIDTH / 1.24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 7,
    paddingHorizontal: 18,
    paddingVertical: 23,
    elevation: 3,
    backgroundColor: '#D50000',
    zIndex: 1,
  },
});

import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const swipeStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    marginHorizontal: 5,
    // marginTop: 30,
    elevation: 3,
    // top: 35,
    height: '100%',
  },
  delete: {
    color: 'white',
    marginLeft: 30,
    marginRight: 20,
  },
  image: {
    height: 70,
    marginLeft: -20,
    marginRight: 5,
    width: 70,
  },
  leftButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#50f442',
    borderRadius: 7,
    elevation: 3,
    justifyContent: 'center',
    marginRight: 5,
    paddingHorizontal: 18,
    paddingVertical: 23,
    position: 'absolute',
  },
  rightButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#D50000',
    borderRadius: 7,
    elevation: 3,
    justifyContent: 'center',
    left: SCREEN_WIDTH / 1.24,
    marginRight: 5,
    paddingHorizontal: 18,
    paddingVertical: 23,
    position: 'absolute',
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
    backgroundColor: '#CFD8DC',
    borderRadius: 7,
    elevation: 3,
    flexDirection: 'row',
    height: 95,
    padding: 20,
    paddingHorizontal: 30,
    paddingVertical: 35,
    shadowColor: '#000',
    shadowOffset: { width: 9, height: 9 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: SCREEN_WIDTH / 1.03,
    zIndex: 2,
  },
  textStyle: {
    fontSize: 17,
  },
  title: {
    fontSize: 14,
  },
});

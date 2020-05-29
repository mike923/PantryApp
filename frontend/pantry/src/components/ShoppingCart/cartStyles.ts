import { StyleSheet } from 'react-native';

export const cartStyles = StyleSheet.create({
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
  container: {
    flex: 1,
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
  image: {
    height: 70,
    width: 70,
  },
  imageContainer: {
    marginRight: '10%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    borderRadius: 20,
    elevation: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 9, height: 9 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
  },
  menu: {
    backgroundColor: '#F02A4B',
  },
  price: {
    color: 'black',
    fontSize: 15,
  },
  secondary: {
    backgroundColor: '#FFF',
    borderRadius: 48 / 2,
    height: 48,
    width: 48,
  },
  title: {
    fontSize: 20,
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
    flex: 1,
    justifyContent: 'center',
  },
  primaryText: {
    color: 'black',
    fontSize: 45,
    position: 'absolute',
  },
  secondaryText: {
    color: 'black',
    fontSize: 35,
    top: '5%',
  },
  svgImg: {
    height: 210,
    width: 320,
  },
});

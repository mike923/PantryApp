import { StyleSheet } from 'react-native';

export const cartStyles = StyleSheet.create({
  container: {
    flex: 1,
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
  price: {
    color: 'black',
    fontSize: 15,
  },
  title: {
    fontSize: 20,
  },
  floatingButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#F02A4B',
    shadowOpacity: 0.5,
    shadowOffset: { height: 10, width: 10 },
  },
  menu: {
    backgroundColor: '#F02A4B',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#FFF',
  },
  deleteButton: {
    backgroundColor: '#ee6e73',
  },
  deleteIcon: {
    color: 'white',
    fontSize: 26,
  },
  addButton: {
    backgroundColor: '#92b9a4',
  },
});

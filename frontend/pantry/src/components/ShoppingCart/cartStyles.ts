import { StyleSheet } from 'react-native';

export const cartStyles = StyleSheet.create({
  addButton: {
    backgroundColor: '#92b9a4',
  },
  button: {
    alignItems: 'center',
    borderRadius: 50,
    bottom: 20,
    height: 70,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    width: 70,
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
});

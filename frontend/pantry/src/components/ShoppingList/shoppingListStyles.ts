import { StyleSheet } from 'react-native';

export const shoppingListStyles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 70 / 2,
    bottom: '5%',
    height: 70,
    justifyContent: 'center',
    position: 'absolute',
    right: '5%',
    shadowColor: '#F02A4B',
    shadowRadius: 10,
    width: 70,
    zIndex: 30,
  },
  container: {
    flex: 1,
  },
  footer: {
    bottom: 50,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 20,
  },
  scrollContainer: {
    bottom: 0,
    flex: 1,
    height: '100%',
  },
  textInput: {
    alignSelf: 'stretch',
    backgroundColor: '#252525',
    borderRadius: 9,
    borderTopColor: '#ededed',
    borderTopWidth: 2,
    color: '#fff',
    left: 6,
    marginBottom: 10,
    padding: 20,
    width: '96%',
  },
});

export const productStyles = StyleSheet.create({
  deleteBtn: {
    alignItems: 'center',
    bottom: 10,
    fontSize: 25,
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    right: '8%',
    top: '70%',
  },
  product: {
    borderBottomColor: '#ededed',
    borderBottomWidth: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingRight: 100,
    position: 'relative',
  },
  productInfo: {
    borderLeftColor: 'black',
    borderLeftWidth: 10,
    paddingLeft: 20,
  },
});

export const itemFormStyles = StyleSheet.create({
  activityIndicator: {
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  closeButton: {
    backgroundColor: '#f7665e',
    borderRadius: 90,
    elevation: 5,
    padding: 10,
    position: 'absolute',
    right: -4,
    top: 0,
    width: 40,
    zIndex: 50,
  },
  modalText: {
    alignSelf: 'center',
    bottom: 0,
    fontSize: 25,

    top: '12%',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,

    elevation: 5,
    height: 300,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  submitButton: {
    alignSelf: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    bottom: 0,
    elevation: 5,
    padding: 10,
    position: 'absolute',
    width: 90,
    zIndex: 50,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const emptyShoppingList = StyleSheet.create({
  emptyListContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  listSvg: {
    height: 380,
    width: 180,
  },
  primaryText: {
    fontSize: 20,
  },
});

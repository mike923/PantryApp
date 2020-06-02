import { StyleSheet } from 'react-native';

// styling for the shopping list component
export const shoppingListStyles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: 'rgb(255, 92, 97)',
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
  plus: {
    color: 'white',
    fontSize: 32,
    fontWeight: '200',
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

// styling for the product component
export const productStyles = StyleSheet.create({
  deleteBtn: {
    alignItems: 'center',
    // backgroundColor: 'blue',
    bottom: 10,
    color: '#900',
    fontSize: 25,
    height: 30,
    justifyContent: 'center',
    // position: 'absolute',
    right: '5%',
    // top: '70%',
  },
  editBtn: {
    backgroundColor: 'red',
    fontSize: 25,
    // left: -70,
    position: 'absolute',
    // top: '70%',
    // width: 60,
    zIndex: 30,
  },
  editable: {
    alignSelf: 'center',
    backgroundColor: 'white',
    color: 'green',
    position: 'absolute',
    right: '70%',
    top: '70%',
    width: 60,
  },
  hidden: {
    zIndex: -8,
  },
  item: {
    color: 'black',
    flex: 1,
    justifyContent: 'center',
    // width: 120,
  },
  itemActionsInvisible: {
    height: 0,
    zIndex: -50,
  },
  itemActionsVisible: {
    alignItems: 'center',
    borderTopColor: 'black',
    borderTopWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-around',
    // top: 10,
    width: 540,
    zIndex: 5,
  },
  itemNameTxt: {
    backgroundColor: 'white',
  },
  nameTxtInput: {
    width: 450,
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
    zIndex: 3,
    backgroundColor: 'yellow',
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    // justifyContent: 'space-around',
    // paddingLeft: 20,
  },
  quantity: {
    fontSize: 20,
    textAlign: 'center',
    width: 50,
  },
  visible: {
    zIndex: 1,
  },
});

// styling for the item form
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

// styling for the empty shopping list component
export const emptyShoppingList = StyleSheet.create({
  emptyListContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    marginBottom: '50%',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    top: '5%',
  },
  listSvg: {
    height: 490,
    top: '6%',
    width: 290,
  },
  secondaryText: {
    fontSize: 28,
    top: '11%',
    zIndex: 20,
  },
});

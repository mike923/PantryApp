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
    alignItems: 'center',
    backgroundColor: 'white',
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
    alignSelf: 'center',
    backgroundColor: '#252525',
    borderRadius: 9,
    borderTopColor: '#ededed',
    borderTopWidth: 2,
    color: '#fff',
    left: 6,
    marginBottom: 10,
    padding: 20,
    width: '85%',
  },
});

// styling for the product component
export const productStyles = StyleSheet.create({
  deleteBtn: {
    alignItems: 'center',
    bottom: 10,
    color: '#900',
    marginTop: '4%',
    position: 'absolute',
    right: '4%',
  },
  editBtn: {
    color: 'black',
    marginTop: '3%',
    position: 'absolute',
    top: '3%',
    zIndex: 30,
  },
  editIcons: {
    fontSize: 25,
    height: 30,
  },
  editable: {
    alignSelf: 'center',
    color: 'green',
    marginTop: '2%',
    position: 'absolute',
    right: '70%',
    top: '10%',
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
  itemActionsVisible: {
    alignItems: 'center',
    backgroundColor: '#dfe2e7',
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 1,
    flex: 1,
    height: 50,
    justifyContent: 'space-around',
    marginTop: -3,
    top: 0,
    zIndex: 5,
    // borderRadius: 15,
    // borderBottomEndRadius: 5,
    // borderBottomLeftRadius: 5,
    // opacity: 0.5,
  },
  itemNameTxt: {
    fontSize: 20,
  },
  nameTxtInput: {
    width: 450,
  },
  product: {
    borderBottomColor: '#ededed',
    borderBottomWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingRight: 100,
    position: 'relative',
    zIndex: 3,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    borderRadius: 5,
    width: 400,
    backgroundColor: '#fcf7f4',
    marginBottom: 3,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    // justifyContent: 'space-around',
    // paddingLeft: 20,
  },
  quantTxtInput: {
    textAlign: 'center',
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
    marginBottom: 10,
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
    position: 'absolute',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  listSvg: {
    height: 490,
    width: 290,
  },
  secondaryText: {
    fontSize: 28,
    zIndex: 20,
  },
});

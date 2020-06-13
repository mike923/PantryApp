import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  date: {
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
  datePicker: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 200,
    justifyContent: 'center',
  },
  img: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: '100%',
    padding: 10,
    width: '100%',
  },
  imgContainer: {
    elevation: 3,
    height: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.22,
    width: '90%',
  },
  modalDoneBtn: {
    backgroundColor: 'orange',
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalDoneBtnText: {
    color: 'white',
    fontSize: 24,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 5,
    flex: 1,
    height: 50,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  name: {
    color: 'black',
    fontSize: 24,
    padding: 10,
  },
  quantity: {
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
  quantityContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  submitBtn: {
    backgroundColor: 'orange',
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 20,
  },
});

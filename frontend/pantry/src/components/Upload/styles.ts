import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

export const Picture = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 89%;
  width: 95%;
  margin-left: 2%;
`;

export const ProgressBar = styled.View`
  background-color: ${(props) => (props.bar === 100 ? 'green' : 'red')};
  height: 3px;
  width: ${(props) => props.bar}%;
  align-items: flex-start;
`;

export const styling = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: '#98FB98',
    borderRadius: 43,
    height: 363,
    marginTop: 90,
    overflow: 'visible',
    // shadowOpacity: 1,
    width: 310,
  },
  icon: {
    alignSelf: 'center',
    color: 'rgba(128,128,128,1)',
    fontSize: 60,
    height: 60,
    marginTop: 143,
    width: 51,
  },
  uploadYourReceipt: {
    color: '#121212',
    fontSize: 30,
    justifyContent: 'space-between',
    letterSpacing: 0,
    lineHeight: 55,
    // marginTop: -274,
    textAlign: 'center',
  },
});

export const confirmStyles = StyleSheet.create({
  buttons: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confirmBtn: {
    backgroundColor: 'rgba(249,153,97,1)',
    borderRadius: 5,
    height: 58,
    marginBottom: 20,
    marginLeft: 96,
    marginTop: 20,
    width: 182,
  },
  confirmText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 24,
    marginLeft: 25,
    marginTop: 17,
  },
  container: {
    flex: 1,
  },
  input: {
    fontSize: 24,
    height: 100,
    width: 200,
  },
  nameBox: {
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 6,
    height: 51,
    marginLeft: 14,
    marginTop: 1,
    width: 256,
  },
  nameText: {
    color: '#121212',
    fontSize: 24,
    marginLeft: 13,
    marginTop: 12,
  },
  priceBox: {
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 6,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 51,
    marginLeft: 11,
    marginTop: 1,
    width: 71,
  },
  priceText: {
    color: '#121212',
    fontSize: 20,
    // marginLeft: 4,
    // marginTop: 14,
  },
  quantityBox: {
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 6,
    height: 51,
    width: 53,
  },
  quantityBoxRow: {
    flexDirection: 'row',
    height: 52,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  quantityText: {
    color: '#121212',
    fontSize: 24,
    marginLeft: 20,
    marginTop: 14,
  },
  scanBarcode: {
    //  position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 70 / 2,
    height: 70,
    justifyContent: 'center',
    shadowColor: '#F02A4B',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    width: 70,
    // shadowOffset: { height: 10, width: 10 },
  },
  scrollView: {
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
  },
  scrollViewContainer: {
    height: 640,
  },
  storeContainer: {
    height: 80,
    width: 366,
  },
  storeDate: {
    color: 'rgba(0,0,0,1)',
    fontSize: 24,
    marginLeft: 172,
    // marginTop: 3,
  },
  storeHeading: {
    // backgroundColor: 'rgba(230, 230, 230,1)',
    flexDirection: 'row',
    height: 70,
    marginLeft: 10,
    width: 395,
  },
  storeName: {
    color: 'rgba(0,0,0,1)',
    fontSize: 30,
  },
  storeNameRow: {
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 7,
  },
  totalRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 30,
    marginHorizontal: 10,
    marginTop: 10,
  },
});

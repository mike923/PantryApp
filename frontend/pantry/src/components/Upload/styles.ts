import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

export const Picture = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 65%;
  width: 95%;
  margin-top: 60%;
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
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 43,
    height: 363,
    marginTop: 243,
    overflow: 'visible',
    shadowOpacity: 1,
    width: 310,
  },
  container: {
    flex: 1,
  },
  cupertinoToolbar: {
    height: 44,
    marginLeft: 19,
    marginTop: 637,
    width: 375,
  },
  upload2: {
    alignSelf: 'center',
    color: 'rgba(128,128,128,1)',
    fontSize: 40,
    height: 40,
    marginTop: 143,
    width: 31,
  },
  uploadYourReceipt: {
    color: '#121212',
    fontSize: 30,
    justifyContent: 'space-between',
    letterSpacing: 0,
    lineHeight: 55,
    marginTop: -474,
    textAlign: 'center',
  },
});

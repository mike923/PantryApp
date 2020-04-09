import styled from 'styled-components/native';
export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

export const Picture = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 300px;
  width: 100%;
`;

export const ProgressBar = styled.View`
  background-color : ${(props) => props.bar === 100 ? 'green' : 'red'};
  height: 3;
  width: ${(props) => props.bar}%;
  align-items: flex-start;
`;

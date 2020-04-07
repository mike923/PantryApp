import { StyleSheet, ViewStyle, TextStyle, ButtonProps } from 'react-native';

interface Styles {
  container: ViewStyle;
  button: ButtonProps;
  buttonText: TextStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
  },
});

export default styles;

import { StyleSheet, ViewStyle, TextStyle, ButtonProps } from 'react-native';

interface Styles {
    container: ViewStyle;
    button: ButtonProps;
    buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    button: {
        backgroundColor: 'blue',
        padding: 10,
    },
    buttonText: {
        color: 'white',
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});

export default styles;

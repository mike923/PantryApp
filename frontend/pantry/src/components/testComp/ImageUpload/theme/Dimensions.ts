import { Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');

const screenHeight = Platform.select({
  ios: height,
  android: Platform.Version < 21 ? height - 25 : height,
});

const dim = {
  screenWidth: width,
  screenHeight,
};

export default dim;

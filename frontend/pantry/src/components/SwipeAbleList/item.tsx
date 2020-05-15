import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  Easing,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { swipeStyles } from './swipeStyle.ts';

const SCREEN_WIDTH = Dimensions.get('window').width;
const RIGHT_BUTTON_THRESHOLD = SCREEN_WIDTH / 15;
const FORCE_TO_OPEN_THRESHOLD = SCREEN_WIDTH / 3.5;
const FORCING_DURATION = 350;
const SCROLL_THRESHOLD = SCREEN_WIDTH / 15;
const LEFT_BUTTONS_THRESHOLD = SCREEN_WIDTH / 7;

class Item extends React.Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY(0, 0);
    this.scrollStopped = false;

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false, // we don't want the item to be animated with a touch
      onMoveShouldSetPanResponder: () => true, // we want to animate the item with a movement
      onResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        this.position.setOffset({ x: this.position.x._value, y: 0 }); // we specify the offset to continue swiping from the place where user left.
        this.position.setValue({ x: 0, y: 0 }); // clearing the position
      },
      onPanResponderMove: (event, gesture) => {
        if (gesture.dx >= SCROLL_THRESHOLD) {
          this.enableScrollView(true);
          const x = gesture.dx - SCROLL_THRESHOLD;
          this.position.setValue({ x, y: 0 });
        } else if (gesture.dx <= -SCROLL_THRESHOLD) {
          this.enableScrollView(true);
          const x = gesture.dx + SCROLL_THRESHOLD;
          this.position.setValue({ x, y: 0 });
        }
      },
      onPanResponderRelease: (event, gesture) => {
        this.position.flattenOffset(); // adding animated value to the offset value then it reset the offset to 0.
        if (gesture.dx > 0) {
          this.userSwipedRight(gesture);
        } else {
          this.userSwipedLeft(gesture);
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(this.position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    });

    this.position = position;
    this.panResponder = panResponder;
  }

  getRightButtonProps() {
    const opacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, -120, -35],
      outputRange: [0, 1, 0],
    });
    return {
      opacity,
    };
  }

  getLeftButtonProps() {
    const opacity = this.position.x.interpolate({
      inputRange: [35, 75, 320],
      outputRange: [0, 1, 0.25],
    });
    const width = this.position.x.interpolate({
      inputRange: [0, 70],
      outputRange: [0, 70],
    });
    return {
      opacity,
      width,
    };
  }

  resetPosition() {
    Animated.timing(this.position, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  completeSwipe(dimension: string, callback: any) {
    const x = dimension === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: FORCING_DURATION,
      useNativeDriver: false,
    }).start(() => this.props.cleanFromScreen(this.props.id));
    callback();
  }

  enableScrollView(isEnabled: any) {
    if (this.scrollView !== isEnabled) {
      this.props.swipingCheck(isEnabled);
      this.scrollView = isEnabled;
    }
  }

  userSwipedLeft(gesture: object) {
    if (gesture.dx <= -RIGHT_BUTTON_THRESHOLD) {
      this.showButton('left');
    } else {
      this.resetPosition();
    }
  }

  userSwipedRight(gesture: object) {
    if (gesture.dx >= FORCE_TO_OPEN_THRESHOLD) {
      this.completeSwipe('right', this.props.leftButtonPressed.bind(this));
    } else if (
      gesture.dx >= LEFT_BUTTONS_THRESHOLD &&
      gesture.dx < FORCE_TO_OPEN_THRESHOLD
    ) {
      this.showButton('right');
    } else {
      this.resetPosition();
    }
  }

  showButton(side: string) {
    const x = side === 'right' ? SCREEN_WIDTH / 4 : -SCREEN_WIDTH / 2.5; // 4 from 4.5 // BURASI DEĞİŞTİRİLECEK
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: 400,
      useNativeDriver: false,
      easing: Easing.out(Easing.quad),
    }).start(() => this.enableScrollView(false));
  }

  render() {
    return (
      <View style={swipeStyles.containerStyle}>
        <Animated.View
          style={[swipeStyles.leftButtonContainer, this.getLeftButtonProps()]}>
          <TouchableOpacity
            onPress={() =>
              this.completeSwipe('right', () => this.props.leftButtonPressed())
            }>
            <Icon type="font-awesome" name="check" />
            <Text style={swipeStyles.textStyle} numberOfLines={1}>
              Accept
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[swipeStyles.textContainer, this.position.getLayout()]}
          {...this.panResponder.panHandlers}>
          <Image
            source={{
              uri:
                this.props.img ||
                'https://cdn0.iconfinder.com/data/icons/ecommerce-57/100/Ecommerce_RTE-03-512.png',
            }}
            style={swipeStyles.image}
          />
          <Text style={swipeStyles.textStyle}>{this.props.message}</Text>
        </Animated.View>

        <Animated.View
          style={[
            swipeStyles.rightButtonContainer,
            { left: SCREEN_WIDTH / 1.7 },
            this.getRightButtonProps(),
          ]}>
          <TouchableOpacity
            onPress={() =>
              this.completeSwipe('left', () => this.props.deleteButtonPressed())
            }>
            <Icon type="font-awesome" name="trash" />
            <Text style={swipeStyles.textStyle}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            swipeStyles.rightButtonContainer,
            { backgroundColor: '#FFC400' },
            this.getRightButtonProps(),
          ]}>
          <TouchableOpacity onPress={() => this.props.editButtonPressed()}>
            <Icon type="font-awesome" name="edit" />
            <Text style={swipeStyles.textStyle}>Edit</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

export default Item;

import React, { Component } from 'react';
import { StyleSheet, Clipboard, ActivityIndicator } from 'react-native';
import {
  Button,
  Content,
  Container,
  Text,
  List,
  Left,
  Body,
  Right,
  Header,
  Icon,
  Title,
} from 'native-base';
import Share from 'react-native-share';
import colors from './colors.ts';

class MemoView extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      visionRes: [],
    };
  }

  componentDidMount() {
    let { navigation, route } = this.props;
    console.log(route.params);

    this.setState({
      visionRes: route.params,
    });
  }

  //   onCancel() {
  //     console.log('CANCEL');
  //     this.setState({ visible: false });
  //   }
  //   onOpen() {
  //     console.log('OPEN');
  //     this.setState({ visible: true });
  //   }

  render() {
    let { visionRes } = this.state;
    console.log('state', visionRes);

    // const { memoStore } = this.props.store;
    // const index = this.props.navigation.getParam('otherParam', 1);
    // console.log('index memo ', index);
    const header = 'hello';
    let shareOptions = {
      title: 'React Native',
      message: 'memoStore.memoArray[index].content',
      social: Share.Social,
    };
    return (
      <Container style={styles.container}>
        <Content>
          <Header
            style={{ backgroundColor: colors.primaryColor }}
            androidStatusBarColor="white">
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{header}</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={async () => {
                  await Clipboard.setString(visionRes);
                  alert('Copied to Clipboard!');
                }}>
                <Icon type="AntDesign" name="copy1" />
              </Button>
              {/* <Button
                transparent
                onPress={() => {
                  this.onCancel();
                  setTimeout(() => {
                    console.log('social', Share);
                    Share.shareSingle(
                      Object.assign(shareOptions, {
                        social: 'whatsapp',
                      }),
                    );
                  }, 300);
                }}>
                <Icon type="AntDesign" name="sharealt" />
              </Button> */}
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('EditView')}>
                <Icon type="AntDesign" name="edit" />
              </Button>
            </Right>
          </Header>
          <Text>
            {visionRes ? (
              JSON.stringify(visionRes)
            ) : (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
          </Text>
        </Content>
      </Container>
    );
  }
}
export default MemoView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',

    flex: 1,
  },
  //   welcome: {
  //     fontSize: 20,
  //     textAlign: 'center',
  //     margin: 10,
  //   },
  //   instructions: {
  //     textAlign: 'center',
  //     color: '#333333',
  //     marginBottom: 5,
  //   },
});

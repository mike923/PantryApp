import React, { Component } from 'react';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { Content, Container, Text } from 'native-base';

import { styles } from './cameraStyles.ts';

class TextView extends Component {
  static navigationOptions = {
    header: null,
    headerShown: false,
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
      visionRes: route.params.res,
    });
  }

  render() {
    let { visionRes } = this.state;
    console.log('state', { visionRes });

    return (
      <Container style={styles.displayContainer}>
        <Content>
          <View>
            {visionRes ? (
              <View>
                {/* <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('EditView')}
                  style={styles.TouchableOpacityStyle}>
                  <Icon type="AntDesign" name="edit" />
                </TouchableOpacity> */}

                {visionRes.map((el) => {
                  return <Text>{el.text}</Text>;
                })}
              </View>
            ) : (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
          </View>
        </Content>
      </Container>
    );
  }
}
export default TextView;

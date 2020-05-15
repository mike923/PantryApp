import React from 'react';
import { ScrollView, UIManager, LayoutAnimation } from 'react-native';
import Item from './item';

class List extends React.Component {
  state = {
    data: this.props.data,
    swiping: false,
  };

  componentUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  cleanFromScreen(id) {
    const data = this.state.data.filter((item) => {
      return item.id !== id;
    });
    this.setState({ data });
  }

  renderItems() {
    return this.state.data.map((item) => {
      return (
        <Item
          img={item.images[0]}
          key={item.id}
          swipingCheck={(swiping) => this.setState({ swiping })}
          message={item.title}
          id={item.id}
          cleanFromScreen={(id) => this.cleanFromScreen(id)}
          leftButtonPressed={() => console.log('left button pressed')}
          deleteButtonPressed={() => console.log('delete button pressed')}
          editButtonPressed={() => console.log('edit button pressed')}
        />
      );
    });
  }
  render() {
    return (
      <ScrollView scrollEnabled={!this.state.swiping}>
        {this.renderItems()}
      </ScrollView>
    );
  }
}

export default List;

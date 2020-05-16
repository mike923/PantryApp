import React from 'react';
import { ScrollView, UIManager, LayoutAnimation } from 'react-native';
import Item from './item';

class List extends React.Component {
  state = {
    data: this.props.data,
    swiping: false,
    itemName: '',
    isEditing: false,
  };

  componentUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  //cleaning the screen of the item from the screenf
  cleanFromScreen(id) {
    const data = this.state.data.filter((item) => {
      return item.id !== id;
    });
    this.setState({ data });
  }
  setTitle = (value: string) => this.setState({ itemName: value });

  //rendering the items in the state to the screen in the items component
  renderItems() {
    return this.state.data.map((item) => {
      return (
        <Item
          setTitle={this.setTitle}
          isEditing={this.state.isEditing}
          img={item.images[0]}
          key={item.id}
          swipingCheck={(swiping) => this.setState({ swiping })}
          message={item.title}
          id={item.id}
          cleanFromScreen={(id) => this.cleanFromScreen(id)}
          leftButtonPressed={() => console.log('left button pressed')}
          deleteButtonPressed={() => console.log('delete button pressed')}
          editButtonPressed={() => this.setState({ isEditing: true })}
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

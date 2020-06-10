import React from 'react';
import { ScrollView, UIManager, LayoutAnimation } from 'react-native';
import Item from './item.tsx';

class List extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      swiping: false,
      isEditing: false,
    };
  }

  // setTitle = (value: string) => this.setState({ itemName: value });

  componentDidUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  // cleaning the screen of the item from the screen
  cleanFromScreen(upc: string) {
    const data: any = this.props.data.filter(
      (item: object) => item.upc !== upc,
    );

    this.props.deleteItem(data);
  }

  // rendering the items in the state to the screen in the items component
  renderItems() {
    let { uploadScannedItem }: any = this.props;

    return this.props.data.map((item: any) => {
      return (
        <Item
          setTitle={this.setTitle}
          isEditing={this.state.isEditing}
          img={item.image[0]}
          key={item.upc}
          swipingCheck={(swiping: boolean) => this.setState({ swiping })}
          message={item.name}
          id={item.id}
          cleanFromScreen={(upc: string) => this.cleanFromScreen(item.upc)}
          leftButtonPressed={() => {
            uploadScannedItem(item);
            this.cleanFromScreen(item.upc);
          }}
          deleteButtonPressed={() => this.cleanFromScreen(item.upc)}
          editButtonPressed={() => this.setState({ isEditing: true })}
        />
      );
    });
  }

  render() {
    console.log('swipe props', this.props.data);

    return (
      <ScrollView
        scrollEnabled={!this.state.swiping}
        style={{ height: '100%' }}>
        {this.renderItems()}
      </ScrollView>
    );
  }
}

export default List;

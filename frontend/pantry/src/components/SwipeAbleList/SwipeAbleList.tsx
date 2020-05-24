import React from 'react';
import { ScrollView, UIManager, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import Item from './item.tsx';
import { deleteItem } from '../../redux/actions/cameraActions.ts';

class List extends React.Component {
  constructor(props) {
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
    const data = this.props.products.filter((item: object) => item.upc !== upc);

    this.props.deleteItem(data);
  }

  // rendering the items in the state to the screen in the items component
  renderItems() {
    return this.props.products.map((item: object) => {
      return (
        <Item
          setTitle={this.setTitle}
          isEditing={this.state.isEditing}
          img={item.image}
          key={item.upc}
          swipingCheck={(swiping: boolean) => this.setState({ swiping })}
          message={item.name}
          id={item.id}
          cleanFromScreen={(upc: string) => this.cleanFromScreen(item.upc)}
          leftButtonPressed={() => console.log('left button pressed')}
          deleteButtonPressed={() => console.log('delete button pressed')}
          editButtonPressed={() => this.setState({ isEditing: true })}
        />
      );
    });
  }

  render() {
    console.log('swipe props', this.props.data);

    return (
      <ScrollView scrollEnabled={!this.state.swiping}>
        {this.renderItems()}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ camera: { products } }) => {
  return {
    products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (data: any) => dispatch(deleteItem(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

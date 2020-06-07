import React, { useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import FoodItem from './FoodItem.tsx';
import { setPantryItems } from '../../redux/actions/pantryActions.ts';

import { client } from '../../../proxy';

// function that sets the loading time for the page refresh
const wait = (timeout: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const foodItems = `/fooditem/pantry`;

const PantryView = ({ navigation }) => {
  const dispatch = useDispatch();
  // TODO: useSelector INSTEAD OF STATE
  const reduxState = useSelector((state) => state.pantry.pantryItems);
  // const [state, setState] = useState([]);
  console.log(navigation.isFocused());
  const goTo = (props) => navigation.navigate('FoodDetailed', { ...props });
  const [refreshing, setRefreshing] = React.useState(false);

  const apiCall = async () => {
    try {
      const { data } = await client.get(foodItems);
      console.log(data.payload);
      // setState(data.payload);
      dispatch(setPantryItems(data.payload));
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  useEffect(() => {
    apiCall();
  }, []);

  const onRefresh = useCallback(() => {
    // pull down on screen to refresh page
    setRefreshing(true);
    apiCall();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <ScrollView
      style={{ backgroundColor: 'white', flex: 1 }}
      refreshControl={
        // allows for pull down to refresh page
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* <Text style={{ alignSelf: 'center' }}>These are all you pantries!</Text> */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchBar}
          value="Search..."
          // onChangeText={(text) => }
        />
      </View>
      <View style={styles.pantryView}>
        {reduxState.map((p: any, i: number) => (
          <FoodItem {...p} key={p.item_id} goTo={goTo} index={i} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    alignSelf: 'center',
  },
  pantryView: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default PantryView;

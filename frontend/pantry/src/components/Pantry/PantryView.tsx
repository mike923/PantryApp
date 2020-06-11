import React, { useEffect, useCallback, useState } from 'react';
import { View, TextInput, StyleSheet, RefreshControl } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
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
  const [searchTerm, setSearchTerm] = useState('');
  // TODO: useSelector INSTEAD OF STATE
  const pantryItems = useSelector((state) => state.pantry.pantryItems);
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
      style={styles.container}
      refreshControl={
        // allows for pull down to refresh page
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* <Text style={{ alignSelf: 'center' }}>These are all you pantries!</Text> */}
      <View style={styles.filterContainer}>
        <View style={styles.searchBar}>
          <FeatherIcon name="search" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            placeholder={searchTerm ? '' : 'Search...'}
            onChangeText={setSearchTerm}
          />
          {searchTerm ? (
            <TouchableOpacity onPress={() => setSearchTerm('')}>
              <FeatherIcon name="delete" style={styles.deleteSearchIcon} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={styles.pantryView}>
        {searchTerm
          ? pantryItems
              .filter(({ preferred_name }) =>
                preferred_name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((foodItem: any, i: number) => (
                <FoodItem
                  {...foodItem}
                  key={foodItem.item_id}
                  goTo={goTo}
                  index={i}
                />
              ))
          : pantryItems.map((foodItem: any, i: number) => (
              <FoodItem
                {...foodItem}
                key={foodItem.item_id}
                goTo={goTo}
                index={i}
              />
            ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  deleteSearchIcon: {
    color: 'lightgrey',
    flex: 0,
    fontSize: 20,
    marginRight: 6,
    marginTop: 3,
  },
  filterContainer: {
    paddingHorizontal: 10,
  },
  pantryView: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // padding: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    marginVertical: 10,
    padding: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
  },
  searchIcon: {
    flex: 0,
    fontSize: 25,
    marginLeft: 4,
    marginRight: 15,
    marginTop: 1,
  },
  searchInput: {
    flex: 1,
  },
});

export default PantryView;

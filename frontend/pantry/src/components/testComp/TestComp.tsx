import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import { getRandomUser } from '../../redux/actions/testActions.ts';
import styles from './styles.ts';

const API = () => {
  const testUser = useSelector((state) => state.testUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getRandomUser())
    // console.debug('API State', testUser);
    // console.log('API State', testUser);
  }, [dispatch, testUser]);

  const displayLoading = () => <Text style={styles.p}>Loading...</Text>;

  const displayUser = () => {
    const { title, first, last } = testUser.apiResults.name;
    const { city, state } = testUser.apiResults.location;
    return (
      <>
        <Text style={styles.p}>{`${title} ${first} ${last}`}</Text>
        <Text style={styles.p}>{`${city}, ${state}`}</Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.h1View}>
        <Text style={styles.h1}>User data</Text>
      </View>
      {!testUser.apiResults ? displayLoading() : displayUser()}
      <TouchableOpacity
        onPress={() => dispatch(getRandomUser())}
        style={styles.button}>
        <Text style={styles.buttonText}>Get User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default API;

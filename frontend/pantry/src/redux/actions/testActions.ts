import { FETCHING, FETCHED } from './actionTypes.ts';

const getRandomUser = () => {
  return (dispatch) => {
    dispatch({ type: FETCHING });
    return fetch('https://randomuser.me/api/')
      .then((res) => res.json())
      .then((json) => {
        console.log(json.results[0]);
        dispatch({ type: FETCHED, payload: json.results[0] });
      });
  };
};

export { getRandomUser };

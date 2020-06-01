import {
  SELECTED_FOOD,
  SET_PANTRY_ITEMS,
  UPDATE_PANTRY_ITEMS,
} from './actionTypes.ts';

export const updatedSelectedFood = (food) => ({
  type: SELECTED_FOOD,
  payload: food,
});

export const setPantryItems = (data) => ({
  type: SET_PANTRY_ITEMS,
  payload: data,
});

export const updatePantryItems = (index, name) => ({
  type: UPDATE_PANTRY_ITEMS,
  payload: { index, name },
});

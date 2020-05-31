import { SELECTED_FOOD } from './actionTypes.ts';

export const updatedSelectedFood = (food) => ({
  type: SELECTED_FOOD,
  payload: food,
});

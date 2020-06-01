import {
  SELECTED_FOOD,
  SET_PANTRY_ITEMS,
  UPDATE_PANTRY_ITEMS,
} from '../actions/actionTypes.ts';

const initPantry = { selectedFood: 'Food', pantryItems: [] };

const pantryReducer = (state = initPantry, action: any) => {
  const stateCopy = { ...state };

  switch (action.type) {
    case SELECTED_FOOD:
      stateCopy.selectedFood = action.payload;
      break;
    case SET_PANTRY_ITEMS:
      stateCopy.pantryItems = action.payload;
      break;
    case UPDATE_PANTRY_ITEMS:
      stateCopy.pantryItems[action.payload.index].preferred_name =
        action.payload.name;
      break;
    default:
      break;
  }
  return stateCopy;
};

export { initPantry, pantryReducer };

import { SELECTED_FOOD } from '../actions/actionTypes.ts';

const initPantry = { selectedFood: 'Food' };

const pantryReducer = (state = initPantry, action: any) => {
  const stateCopy = { ...state };

  switch (action.type) {
    case SELECTED_FOOD:
      stateCopy.selectedFood = action.payload;
      break;
    default:
      break;
  }
  console.log(stateCopy);
  return stateCopy;
};

export { initPantry, pantryReducer };

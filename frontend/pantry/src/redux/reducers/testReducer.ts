import { FETCHING, FETCHED } from '../actions/actionTypes.ts';

const init = {
    apiResults: null,
    fetching: false,
};

const testReducer = (state = init, action) => {
    const stateCopy = { ...state };

    switch (action.type) {
        case FETCHING:
            console.log('Fetching api');
            stateCopy.fetching = true;
            break;
        case FETCHED:
            console.log('Fetched api', action.payload);
            stateCopy.fetching = false;
            stateCopy.apiResults = action.payload;
            break;
        default:
            break;
    }

    return stateCopy;
};

export { init, testReducer };

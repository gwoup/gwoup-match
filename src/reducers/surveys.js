import {Types} from '../actions/surveys';

const defaultState = {surveys: []};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case Types.INIT_SURVEYS:
      return [...action.payload];

    default:
      return state;
  }
};

export default reducer;

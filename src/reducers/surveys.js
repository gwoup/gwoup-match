import {Types} from '../actions/surveys';

const defaultState = {collection: [], matchingSurvey: null};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case Types.GET_SURVEYS_BY_OWNER:
      return {...state, collection: [...action.payload]};

    case Types.GET_SURVEY_BY_PIN:
      return {...state, matchingSurvey: action.payload};

    case Types.RESET_MATCHING_SURVEY:
      return {...state, matchingSurvey: null};

    default:
      return state;
  }
};

export default reducer;

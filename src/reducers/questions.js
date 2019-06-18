import {Types} from '../actions/questions';
import {v4 as uuidv4} from "uuid";

const defaultState = {questions: []};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.CREATE_QUIZ:
      return {...state, questions: []};


    case Types.CREATE_QUESTION:
      action.payload.id = uuidv4();
      return [...state, action.payload];

    case Types.DELETE_QUESTION:
      const questionId = action.payload;
      return state.filter(obj => obj.id !== questionId);

    case Types.RESET_QUESTIONS:
      return [];

    case Types.UPDATE_QUESTION:
      let updatedQuestionIndex = -1;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          updatedQuestionIndex = i;
          break;
        }
      }

      if (updatedQuestionIndex > -1) {
        return [
          ...state.slice(0, updatedQuestionIndex),
          action.payload,
          ...state.slice(updatedQuestionIndex + 1, state.length)
        ];
      }

      return state;
    default:
      return state;
  }
};

export default reducer;

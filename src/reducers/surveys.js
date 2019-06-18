import {API, graphqlOperation} from "aws-amplify";

import {createQuiz, updateQuiz} from "../graphql/mutations";
import {Types} from '../actions/surveys';

const defaultState = {surveys: []};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case Types.INIT_SURVEYS:
      return [...action.payload];

    // case Types.SAVE_SURVEY:
    //
    //   const {id, title, minGroupSize, maxGroupSize, preferredGroupSize, status, questions} = action.payload;
    //
    //   try {
    //     const graphQLop = (id === null) ? createQuiz : updateQuiz;
    //     const input = {
    //       id,
    //       title,
    //       minGroupSize,
    //       maxGroupSize,
    //       preferredGroupSize,
    //       questions,
    //       status,
    //       responses: [],
    //       uKey: ""
    //     };
    //
    //     await API.graphql(graphqlOperation(graphQLop, {input}));
    //     this.props.history.push('/quizzes');
    //   } catch (e) {
    //     console.log(e);
    //   }
    //
    //   return [...action.payload];

    default:
      return state;
  }
};

export default reducer;

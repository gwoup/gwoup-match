import {API, graphqlOperation} from "aws-amplify";
import {createQuiz, updateQuiz} from "../graphql/mutations";
import {fetchQuiz} from "../graphql/queries";

const Types = {
  INIT_SURVEYS: "INIT_SURVEYS",
  ADD_SURVEY: "ADD_SURVEY",
  ADD_SURVEY_FAILURE: "ADD_SURVEY_FAILURE",
  GET_SURVEY_BY_ID: "GET_SURVEY_BY_ID",
  GET_SURVEY_FAILURE: "GET_SURVEY_FAILURE",
};

const initSurveys = surveys => ({
  type: Types.INIT_SURVEYS,
  payload: surveys
});

const getSurveyById = (surveyId) => {
  return async dispatch => {
    const onSuccess = (success) => {
      dispatch({type: Types.GET_SURVEY_BY_ID, payload: success});
      return success;
    };

    const onError = (error) => {
      dispatch({type: Types.GET_SURVEY_FAILURE, error});
      return error;
    };

    try {
      const result = await API.graphql(graphqlOperation(fetchQuiz, {id: surveyId}));
      return onSuccess(result.data.fetchQuiz);
    } catch (error) {
      return onError(error);
    }
  }
};


const saveSurvey = (survey) => {
  return async dispatch => {
    const onSuccess = (success) => {
      dispatch({type: Types.ADD_SURVEY, payload: success});
      return success;
    };

    const onError = (error) => {
      dispatch({type: Types.ADD_SURVEY_FAILURE, error});
      return error;
    };

    try {
      let graphQlOp, graphQlFieldOp;

      if (survey.id === null) {
        graphQlOp = createQuiz;
        graphQlFieldOp = "createQuiz";
      } else {
        graphQlOp = updateQuiz;
        graphQlFieldOp = "updateQuiz";
      }

      const result = await API.graphql(graphqlOperation(graphQlOp, {input: survey}));
      return onSuccess(result.data[graphQlFieldOp]);
    } catch (error) {
      return onError(error);
    }
  }
};


export {
  initSurveys,
  saveSurvey,
  getSurveyById,
  Types
};
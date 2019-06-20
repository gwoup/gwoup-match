import {API, graphqlOperation} from "aws-amplify";
import {createSurvey, updateSurvey} from "../graphql/mutations";
import {fetchSurvey} from "../graphql/queries";
import {getSurveyByPin} from "../graphql/customQueries";

const Types = {
  INIT_SURVEYS: "INIT_SURVEYS",
  ADD_SURVEY: "ADD_SURVEY",
  ADD_SURVEY_FAILURE: "ADD_SURVEY_FAILURE",
  GET_SURVEY_BY_ID: "GET_SURVEY_BY_ID",
  GET_SURVEY_BY_PIN: "GET_SURVEY_BY_PIN",
  GET_SURVEY_FAILURE: "GET_SURVEY_FAILURE",
};

const SurveyStatuses = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  VOTED: "VOTED",
  CLOSED: "CLOSED"
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
      const result = await API.graphql(graphqlOperation(fetchSurvey, {id: surveyId}));
      return onSuccess(result.data.fetchSurvey);
    } catch (error) {
      return onError(error);
    }
  }
};

const getPublishedSurveyByPin = (pin) => {
  return async dispatch => {
    const onSuccess = (success) => {
      dispatch({type: Types.GET_SURVEY_BY_PIN, payload: success});
      return success;
    };

    const onError = (error) => {
      dispatch({type: Types.GET_SURVEY_FAILURE, error});
      return error;
    };

    try {
      const result = await API.graphql(graphqlOperation(getSurveyByPin, {pin}));
      const survey = result.data.getSurveyByPin.items.length ? result.data.getSurveyByPin.items[0] : null;
      if (survey && survey.status === SurveyStatuses.PUBLISHED) {
        return onSuccess(survey);
      }
      return onSuccess(null);

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

      if (survey.id === null || typeof survey.id === "undefined") {
        graphQlOp = createSurvey;
        graphQlFieldOp = "createSurvey";
      } else {
        graphQlOp = updateSurvey;
        graphQlFieldOp = "updateSurvey";
      }

      console.log(survey);
      console.log(graphQlFieldOp);

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
  getPublishedSurveyByPin,
  Types,
  SurveyStatuses
};
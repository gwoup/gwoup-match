import {API, graphqlOperation} from "aws-amplify";
import {createSurvey, updateSurvey} from "../graphql/mutations";
import {fetchSurvey} from "../graphql/queries";
import {getSurveyByPin} from "../graphql/customQueries";
import {deserializeQuestionsArr} from "../utils/survey";

const Types = {
  INIT_SURVEYS: "INIT_SURVEYS",
  ADD_SURVEY: "ADD_SURVEY",
  ADD_SURVEY_FAILURE: "ADD_SURVEY_FAILURE",
  GET_SURVEYS_BY_OWNER: "GET_SURVEYS_BY_OWNER",
  GET_SURVEY_BY_ID: "GET_SURVEY_BY_ID",
  GET_SURVEY_BY_PIN: "GET_SURVEY_BY_PIN",
  GET_SURVEY_FAILURE: "GET_SURVEY_FAILURE",
  RESET_MATCHING_SURVEY: "RESET_MATCHING_SURVEY",
};

const SurveyStatuses = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  VOTED: "VOTED",
  CLOSED: "CLOSED"
};

const getSurveys = ownerId => {
  return async dispatch => {
    const onSuccess = (success) => {
      dispatch({type: Types.GET_SURVEYS_BY_OWNER, payload: success});
      return success;
    };

    const onError = (error) => {
      dispatch({type: Types.GET_SURVEY_FAILURE, error});
      return error;
    };

    try {
      const result = await API.get('survey', '/surveys', {
        queryStringParameters: {
          ownerId
        }
      });
      return onSuccess(result.data);
    } catch (error) {
      return onError(error);
    }
  }
};

const getSurveyById = surveyId => {
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
      dispatch({type: Types.RESET_MATCHING_SURVEY});

      const result = await API.graphql(graphqlOperation(getSurveyByPin, {pin}));
      const survey = result.data.getSurveyByPin.items.length ? result.data.getSurveyByPin.items[0] : null;
      if (survey && survey.status === SurveyStatuses.PUBLISHED) {
        survey.questions = deserializeQuestionsArr(survey.questions);
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
      console.log(survey);
      let data;

      if (survey.id === null || typeof survey.id === "undefined") {
        data = await API.post('survey', '/surveys', {body: survey});
      } else {
        data = await API.put('survey', '/surveys', {body: survey});
      }

      console.log(data);
      return onSuccess(data);
    } catch (error) {
      return onError(error);
    }
  }
};


const submitAnswer = (surveyId, answers) => {
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
      const survey = await API.graphql(graphqlOperation(fetchSurvey, {id: surveyId}));
      // check - is response available
      // if not - add response, update
      // TODO:
      let response = {
        respondentId: "",
        answers
      }
      // survey.responses
      await API.graphql(graphqlOperation(updateSurvey, {input: survey}));
      return onSuccess(1);
    } catch (error) {
      return onError(error);
    }
  }
};

export {
  getSurveys,
  saveSurvey,
  getSurveyById,
  getPublishedSurveyByPin,
  submitAnswer,
  Types,
  SurveyStatuses
};
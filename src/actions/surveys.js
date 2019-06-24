import {API, graphqlOperation} from "aws-amplify";
import {createSurvey, updateSurvey} from "../graphql/mutations";
import {fetchSurvey} from "../graphql/queries";
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
  DELETE_SURVEY: "DELETE_SURVEY",
  DELETE_SURVEY_FAILURE: "DELETE_SURVEY_FAILURE",
  PUBLISH_SURVEY_FAILURE: "PUBLISH_SURVEY_FAILURE",
  SET_ANSWER_STATUS: "SET_ANSWER_STATUS",
  ADD_SURVEY_STATUS: "ADD_SURVEY_STATUS",
  ADD_SURVEY_STATUS_FAILURE: "ADD_SURVEY_STATUS_FAILURE",
  GROUPING_SURVEY: "GROUPING_SURVEY",
  GROUPING_STATUS_FAILURE: "GROUPING_STATUS_FAILURE",
  SURVEY_GROUPS: "SURVEY_GROUPS",
  SURVEY_GROUPS_FAILURE: "SURVEY_GROUPS_FAILURE",
};

const SurveyStatuses = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  COMPLETED: "COMPLETED",
  CLOSED: "CLOSED"
};

const getSurveys = () => {
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
      const result = await API.get('survey', '/surveys', {});
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
      const result = await API.get('survey', '/surveys', {
        queryStringParameters: {
          surveyId
        }
      });

      if (result.data && result.data.length) {
        return onSuccess(result.data[0]);
      } else {
        return onError("Survey was not found");
      }
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

      const survey = await API.get('survey', `/surveys/by-pin`, {
        queryStringParameters: {
          pin
        }
      });

      if (survey) {
        survey.pin = pin;
        survey.questions = deserializeQuestionsArr(survey.questions);
        return onSuccess(survey);
      }

      return onSuccess(null);
    } catch (error) {
      return onError(error);
    }
  }
};

const deleteSurvey = (surveyId) => {
  return async dispatch => {
    const onSuccess = (success) => {
      dispatch({type: Types.DELETE_SURVEY, payload: success});
      return success;
    };

    const onError = (error) => {
      dispatch({type: Types.DELETE_SURVEY_FAILURE, error});
      return error;
    };

    try {
      const data = await API.del('survey', '/surveys', {
        queryStringParameters: {
          surveyId
        }
      });
      return onSuccess(data);
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

      if (survey.surveyId === null || typeof survey.surveyId === "undefined") {
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

const publishSurvey = (surveyId) => {
  return async dispatch => {
    const onError = (error) => {
      dispatch({type: Types.PUBLISH_SURVEY_FAILURE, error});
      return error;
    };

    try {
      await API.put('survey', '/surveys/publish', {
        body: {
          surveyId,
          publish: true
        }
      });
    } catch (error) {
      return onError(error);
    }
  }
};

const submitAnswer = (pin, answers) => {
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
      const response = await API.post('survey', '/surveys/answers', {
        body: {
          pin,
          answers
        }
      });

      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  }
};

const getSurveyStatusById = (surveyId) => {
  return async dispatch => {
    const onSuccess = (success) => {
      dispatch({type: Types.ADD_SURVEY_STATUS, payload: success});
      return success;
    };

    const onError = (error) => {
      dispatch({type: Types.ADD_SURVEY_STATUS_FAILURE, error});
      return error;
    };

    try {
      const response = await API.get('survey', `/surveys/status/${surveyId}`, {});

      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  }
};

const groupingSurvey = (surveyId) => {
  return async dispatch => {
    const onSuccess = (success) => {
      dispatch({type: Types.GROUPING_SURVEY, payload: success});
      return success;
    };

    const onError = (error) => {
      dispatch({type: Types.GROUPING_STATUS_FAILURE, error});
      return error;
    };

    try {
      const response = await API.post('survey', `/surveys/groups/${surveyId}`, {});

      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  }
};


const getSurveyGroups = (surveyId) => {
  return async dispatch => {
    const onSuccess = (success) => {
      dispatch({type: Types.SURVEY_GROUPS, payload: success});
      return success;
    };

    const onError = (error) => {
      dispatch({type: Types.SURVEY_GROUPS_FAILURE, error});
      return error;
    };

    try {
      const response = await API.get('survey', `/surveys/groups/${surveyId}`, {});

      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  }
};

// answers validation
const setAnswerStatus = (questionId, status) => ({
  type: Types.SET_ANSWER_STATUS,
  payload: {
    questionId, status
  }
});

export {
  getSurveys,
  saveSurvey,
  getSurveyById,
  getPublishedSurveyByPin,
  submitAnswer,
  deleteSurvey,
  publishSurvey,
  setAnswerStatus,
  getSurveyStatusById,
  groupingSurvey,
  getSurveyGroups,
  Types,
  SurveyStatuses
};
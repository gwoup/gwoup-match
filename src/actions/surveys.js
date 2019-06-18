const Types = {
  INIT_SURVEYS: "INIT_SURVEYS",
  SAVE_SURVEY: "SAVE_SURVEY",
};

const initSurveys = surveys => ({
  type: Types.INIT_SURVEYS,
  payload: surveys
});

const saveSurvey = survey => ({
  type: Types.SAVE_SURVEY,
  payload: survey
});

export {
  initSurveys,
  saveSurvey,
  Types
};
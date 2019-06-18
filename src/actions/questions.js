const Types = {
  CREATE_QUIZ: "CREATE_QUIZ",
  CREATE_QUESTION: "CREATE_QUESTION",
  UPDATE_QUESTION: "UPDATE_QUESTION",
  DELETE_QUESTION: "DELETE_QUESTION",
  GET_QUESTION: "GET_QUESTION",
  RESET_QUESTIONS: "RESET_QUESTIONS"
};

const createQuestion = question => ({
  type: Types.CREATE_QUESTION,
  payload: question
});

const updateQuestion = question => ({
  type: Types.UPDATE_QUESTION,
  payload: question
});

const deleteQuestion = id => ({
  type: Types.DELETE_QUESTION,
  payload: id
});

const resetQuestions = () => ({
  type: Types.RESET_QUESTIONS
});

const getQuestion = id => ({
  type: Types.GET_QUESTION,
  payload: id
});

export {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  resetQuestions,
  getQuestion,
  Types
};
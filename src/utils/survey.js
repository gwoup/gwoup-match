const serializeQuestionsArr = (questions) => {
  return questions.map(obj => serializeQuestion(obj));
};

const serializeQuestion = (question) => {
  if (question.questionType === 'QuestionLinearScale') {
    const {id, title, minValue, minValueTitle, maxValue, maxValueTitle, questionType} = question;
    return {
      title,
      type: questionType,
      jsonStructure: JSON.stringify({
        id, minValue, minValueTitle, maxValue, maxValueTitle
      })
    };
  }
  // return JSON.stringify([]);
};

const deserializeQuestion = (question) => {
  if (question.type === 'QuestionLinearScale') {
    const {title, type, jsonStructure} = question;
    const {id, minValue, minValueTitle, maxValue, maxValueTitle} = JSON.parse(jsonStructure);
    return {
      id,
      title,
      questionType: type,
      minValue,
      minValueTitle,
      maxValue,
      maxValueTitle
    };
  }
};

const deserializeQuestionsArr = (questions) => {
  return questions.map(obj => deserializeQuestion(obj));
};

export {
  serializeQuestion,
  serializeQuestionsArr,
  deserializeQuestion,
  deserializeQuestionsArr
};
import QuestionLinearScale from "../components/Questions/QuestionLinearScale";
import QuestionDateTime from "../components/Questions/QuestionDateTime";

const serializeQuestionsArr = (questions) => {
  return questions.map(obj => serializeQuestion(obj));
};

const serializeQuestion = (question) => {
  if (question.questionType === QuestionLinearScale.questionType) {
    const {id, title, minValue, minValueTitle, maxValue, maxValueTitle, questionType} = question;
    return {
      title,
      type: questionType,
      jsonStructure: JSON.stringify({
        id, minValue, minValueTitle, maxValue, maxValueTitle
      })
    };
  }

  if (question.questionType === QuestionDateTime.questionType) {
    const {id, title, dateValue, questionType} = question;
    return {
      title,
      type: questionType,
      jsonStructure: JSON.stringify({
        id, dateValue
      })
    };
  }

  return JSON.stringify([]);
};

const deserializeQuestion = (question) => {
  if (question.type === QuestionLinearScale.questionType) {
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

  if (question.type === QuestionDateTime.questionType) {
    const {title, type, jsonStructure} = question;
    const {id, dateValue} = JSON.parse(jsonStructure);
    return {
      id,
      title,
      questionType: type,
      dateValue
    };
  }

  return JSON.stringify([]);
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
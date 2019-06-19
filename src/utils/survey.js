import QuestionLinearScale from "../components/Questions/QuestionLinearScale";
import QuestionDateTime from "../components/Questions/QuestionDateTime";

const serializeQuestionsArr = (questions) => {
  return questions.map(obj => serializeQuestion(obj));
};

const serializeQuestion = (question) => {
  if (question.questionType === QuestionLinearScale.questionType) {
    const {id, title, minValue, minValueTitle, maxValue, maxValueTitle, questionType} = question;
    return {
      questionId: id,
      title,
      type: questionType,
      jsonStructure: JSON.stringify({
        minValue, minValueTitle, maxValue, maxValueTitle
      })
    };
  }

  if (question.questionType === QuestionDateTime.questionType) {
    const {id, title, dateValue, questionType} = question;
    return {
      questionId: id,
      title,
      type: questionType,
      jsonStructure: JSON.stringify({
        dateValue
      })
    };
  }

  return JSON.stringify([]);
};

const deserializeQuestion = (question) => {
  if (question.type === QuestionLinearScale.questionType) {
    const {questionId, title, type, jsonStructure} = question;
    const {minValue, minValueTitle, maxValue, maxValueTitle} = JSON.parse(jsonStructure);
    return {
      id: questionId,
      title,
      questionType: type,
      minValue,
      minValueTitle,
      maxValue,
      maxValueTitle
    };
  }

  if (question.type === QuestionDateTime.questionType) {
    const {questionId, title, type, jsonStructure} = question;
    const {dateValue} = JSON.parse(jsonStructure);
    return {
      id: questionId,
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
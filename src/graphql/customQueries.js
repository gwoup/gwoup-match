export const getSurveyByPin = `query GetSurveyByPin($pin: String) {
  getSurveyByPin(pin: $pin) {
    items {
      id
      title
      description
      questions {
        questionId
        type
        title
        description
        jsonStructure
      }
      status
      pin
    }
  }
}
`;

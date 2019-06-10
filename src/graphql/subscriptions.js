// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateQuiz = `subscription OnCreateQuiz {
  onCreateQuiz {
    id
    title
    description
    questions {
      id
      type
      title
      description
      questionsJsonStrincture
    }
    minGroupSize
    maxGroupSize
    preferedGroupSize
    status
    editors
    key
    responses {
      respondent
      response {
        questionId
        response
      }
    }
    groups {
      items {
        id
        name
        members
      }
      nextToken
    }
  }
}
`;

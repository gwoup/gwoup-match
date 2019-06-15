export const onCreateOrDeleteQuiz = `subscription OnCreateOrDeleteQuiz {
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
    preferredGroupSize
    status
    editors
    uKey
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
  },
  onDeleteQuiz {
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
    preferredGroupSize
    status
    editors
    uKey
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

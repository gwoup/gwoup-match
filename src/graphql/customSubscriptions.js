export const onCreateOrDeleteQuiz = `subscription OnCreateOrDeleteQuiz {
onCreateQuiz {
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
    minGroupSize
    maxGroupSize
    preferredGroupSize
    status
    editors
    pin
    responses {
      respondent
      response {
        questionId
        jsonResponse
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
,
  onDeleteQuiz {
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
    minGroupSize
    maxGroupSize
    preferredGroupSize
    status
    editors
    pin
    responses {
      respondent
      response {
        questionId
        jsonResponse
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

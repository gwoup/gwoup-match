// eslint-disable
// this is an auto generated file. This will be overwritten

export const fetchQuiz = `query FetchQuiz($id: ID!) {
  fetchQuiz(id: $id) {
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
    uKey
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
export const listQuizzes = `query ListQuizzes(
  $filter: ModelQuizFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuizzes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      minGroupSize
      maxGroupSize
      preferredGroupSize
      status
      editors
      uKey
      responses {
        respondent
      }
      groups {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getGroup = `query GetGroup($id: ID!) {
  getGroup(id: $id) {
    id
    name
    members
    quiz {
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
      uKey
      responses {
        respondent
      }
      groups {
        nextToken
      }
    }
  }
}
`;
export const listGroups = `query ListGroups(
  $filter: ModelGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      members
      quiz {
        id
        title
        description
        minGroupSize
        maxGroupSize
        preferredGroupSize
        status
        editors
        uKey
      }
    }
    nextToken
  }
}
`;

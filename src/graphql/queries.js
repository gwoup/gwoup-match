// eslint-disable
// this is an auto generated file. This will be overwritten

export const getQuiz = `query GetQuiz($id: ID!) {
  getQuiz(id: $id) {
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
export const listQuizs = `query ListQuizs(
  $filter: ModelQuizFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuizs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
        preferedGroupSize
        status
        editors
        uKey
      }
    }
    nextToken
  }
}
`;

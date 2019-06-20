// eslint-disable
// this is an auto generated file. This will be overwritten

export const fetchSurvey = `query FetchSurvey($id: ID!) {
  fetchSurvey(id: $id) {
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
export const listSurveys = `query ListSurveys(
  $filter: ModelSurveyFilterInput
  $limit: Int
  $nextToken: String
) {
  listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      pin
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
    survey {
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
      survey {
        id
        title
        description
        minGroupSize
        maxGroupSize
        preferredGroupSize
        status
        editors
        pin
      }
    }
    nextToken
  }
}
`;
export const getSurveyByPin = `query GetSurveyByPin(
  $pin: String
  $filter: ModelSurveyFilterInput
  $limit: Int
  $nextToken: String
) {
  getSurveyByPin(
    pin: $pin
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
      pin
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

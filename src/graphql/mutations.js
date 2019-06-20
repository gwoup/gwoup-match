// eslint-disable
// this is an auto generated file. This will be overwritten

export const createSurvey = `mutation CreateSurvey($input: CreateSurveyInput!) {
  createSurvey(input: $input) {
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
export const updateSurvey = `mutation UpdateSurvey($input: UpdateSurveyInput!) {
  updateSurvey(input: $input) {
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
export const deleteSurvey = `mutation DeleteSurvey($input: DeleteSurveyInput!) {
  deleteSurvey(input: $input) {
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
export const createGroup = `mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
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
export const updateGroup = `mutation UpdateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
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
export const deleteGroup = `mutation DeleteGroup($input: DeleteGroupInput!) {
  deleteGroup(input: $input) {
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

// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateSurvey = `subscription OnCreateSurvey {
  onCreateSurvey {
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
export const onUpdateSurvey = `subscription OnUpdateSurvey {
  onUpdateSurvey {
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
export const onDeleteSurvey = `subscription OnDeleteSurvey {
  onDeleteSurvey {
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

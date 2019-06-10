// eslint-disable
// this is an auto generated file. This will be overwritten

export const createQuiz = `mutation CreateQuiz($input: CreateQuizInput!) {
  createQuiz(input: $input) {
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
export const createGroup = `mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
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
      key
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
      key
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
      key
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

// eslint-disable
// this is an auto generated file. This will be overwritten

export const searchQuizs = `query SearchQuizs(
  $filter: SearchableQuizFilterInput
  $sort: SearchableQuizSortInput
  $limit: Int
  $nextToken: Int
) {
  searchQuizs(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
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
      key
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

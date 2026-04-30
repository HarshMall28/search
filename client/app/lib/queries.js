import { gql } from '@apollo/client'

export const SEARCH_QUERY = gql`
  query Search($term: String!, $limit: Int) {
    search(term: $term, limit: $limit) {
      mongoTime
      meiliTime
      speedMultiplier
      totalMongoCount
      totalMeiliCount
      mongoResults {
        id
        title
        description
        category
        brand
        price
        image
        rating
        stock
      }
      meiliResults {
        id
        title
        description
        category
        brand
        price
        image
        rating
        stock
      }
    }
  }
`

import gql from 'graphql-tag';

export const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    description: String!
    category: String!
    brand: String!
    price: Float!
    image: String!
    rating: Float!
    stock: Int!
  }

  type SearchResult {
    mongoResults: [Product!]!
    meiliResults: [Product!]!
    mongoTime: Int!
    meiliTime: Int!
    speedMultiplier: Float!
    totalMongoCount: Int!
    totalMeiliCount: Int!
  }

  type Query {
    search(term: String!, limit: Int): SearchResult!
    product(id: ID!): Product
    products(limit: Int): [Product!]!
  }
`;

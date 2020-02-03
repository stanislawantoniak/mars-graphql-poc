const { gql } = require('apollo-server');

const typeDefs = gql`

type Product {
  id: ID!
  name: String
  brand: String
  description: String
  cost: Float
  sapProductTitle: String
  retailPrice: Float
  backImage: Asset
  mainImage: Asset
  assets: [Asset]!
}

type Asset {
  id: ID!
  url: String
  format: String
  status: String
  bytes: Int
}

type Query {
  products: [Product]!
  product(id: ID!): Product
}

`;

module.exports = typeDefs;


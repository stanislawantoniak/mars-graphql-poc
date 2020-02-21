const { gql } = require('apollo-server');

const typeDefs = gql`

type Product {
  id: ID!
  systemId: String
  name: String
  brand: String
  description: String
  cost: Float
  SAPProductTitle: String
  retailPrice: Float
  backImage: Asset
  mainImage: Asset
  digitalAssets: [Asset]!
}

type Asset {
  id: ID!
  URL: String
  name: String
  format: String
  status: String
  bytes: Int
}

type Query {
  products: [Product]!
  product(id: ID!): Product
}

type UpdateProductResponse {
  success: Boolean!
  message: String!
  product: Product
}
 
input ProductInput {
  id: String!
  name: String
  brand: String
  description: String
  cost: Float
  sapProductTitle: String
  retailPrice: Float
}

type Mutation {
  updateProduct(product: ProductInput!): UpdateProductResponse
}

`;

module.exports = typeDefs;


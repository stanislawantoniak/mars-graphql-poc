module.exports = {
  Query: {
    products: (_, __, { dataSources }) =>
      dataSources.productAPI.getAllProducts(),
    product: (_, { id }, { dataSources }) =>
      dataSources.productAPI.getProductById(id)
  }
};
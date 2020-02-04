module.exports = {
  Query: {
    products: async (_, __, { dataSources }) =>
      dataSources.productAPI.getAllProducts(),
    product: async (_, { id }, { dataSources }) =>
      dataSources.productAPI.getProductById(id)
  },
  Mutation: {
    updateProduct: async (_, {product}, {dataSources}) => {
      const updateResult = await dataSources.productAPI.updateProduct(product);
      const productResult = await dataSources.productAPI.getProductById(product.id);

      return {
        success: updateResult,
        message:
         updateResult
            ? 'product updated'
            : `error updating product`,
        productResult
      }
    }
  }
};
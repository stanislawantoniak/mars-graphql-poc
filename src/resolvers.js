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

      console.log('updateResult.status::'+updateResult.status);
      
      return {
        success: updateResult.status < 300,
        message:
         updateResult.status < 300
            ? 'product updated'
            : `error updating product`,
        productResult
      }
    }
  }
};
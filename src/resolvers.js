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

      console.log('updateResult::'+JSON.stringify(updateResult));

      console.log('productResult::'+JSON.stringify(productResult));

      return {
        success: true,
        message: updateResult.status < 300
            ? 'product updated'
            : `error updating product`,
        product: productResult
      }
    }
  }
};
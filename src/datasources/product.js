const { RESTDataSource } = require('apollo-datasource-rest');

class SalsifyTokenSource extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Authorization', 'Bearer ' + process.env.SALSIFY_KEY);
  }
}

class ProductAPI extends SalsifyTokenSource {

  constructor() {
    super();
    this.baseURL = 'https://app.salsify.com/api/v1/orgs/s-81e351da-195f-412c-8fd8-f011973f6ab1/';
  }

  async getAllProducts() {
  const response = await this.get('products');
  return Array.isArray(response.data)
    ? response.data.map(product => this.productReducer(product))
    : [];
  }

checkId(item){
  console.log('this in checkId'+this);
  return item == null
  ? false
  : item['salsify:id'] == this
}

getImageFromAssets(assetArray, id){

  const asset = (assetArray == null
  ? null
  : assetArray.find(this.checkId,id));

  return asset;

}

productReducer(product) {

  return {
    id: product["salsify:id"] || 0,
    name: product["Product name"],
    brand: product.Brand,
    description: product.Descriptions,
    sapProductTitle: product['SAP Product Title'],
    cost: product.cost,
    retailPrice: product['Retail Price'],
    mainImage: this.assetReducer(this.getImageFromAssets(product['salsify:digital_assets'],product['Main Image (Front)'])),
    backImage: this.assetReducer(this.getImageFromAssets(product['salsify:digital_assets'],product['Back Image'])),
    assets: product['salsify:digital_assets'] == null ? [] : product['salsify:digital_assets'].map(asset => this.assetReducer(asset))
  };
}

assetReducer(asset) {
  console.log('asset::'+asset);
  return asset == null
  ? null
  :{
    id: asset['salsify:id'] || 0,
    url: asset['salsify:url'],
    format: asset['salsify:format'],
    bytes: asset['salsify:bytes'],
    status: asset['salsify:status']
  };
}
 
async getProductById( id ) {
  const response = await this.get('products/'+id);
  return this.productReducer(response);
}

}

module.exports = ProductAPI;


import axios from 'axios';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IRequestProductDTO from '@modules/products/dtos/IRequestProductDTO';

class ProductsRepository implements IProductsRepository {
  apiUrl: string;

  constructor() {
    this.apiUrl = 'https://challenge-api.luizalabs.com/api/product';
  }

  async findById(id: string): Promise<IRequestProductDTO | undefined> {
    let response;

    try {
      response = await (await axios.get(`${this.apiUrl}/${id}/`)).data;
    } catch (err) {
      console.error(err);
    }

    return response;
  }
}

export default ProductsRepository;

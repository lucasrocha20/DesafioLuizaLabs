import { getRepository, Repository } from 'typeorm';

import IFavoriteProductsRepository from '@modules/favoriteProducts/repositories/IFavoriteProductsRepository';
import ICreateFavoriteProductsDTO from '@modules/favoriteProducts/dtos/ICreateFavoriteProductsDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/external/repositories/ProductsRepository';
import FavoriteProducts from '../entities/FavoriteProducts';

class FavoriteProductsRepository implements IFavoriteProductsRepository {
  private ormRepository: Repository<FavoriteProducts>;

  private productsRepository: IProductsRepository = new ProductsRepository();

  constructor() {
    this.ormRepository = getRepository(FavoriteProducts);
  }

  async findByClientId(clientId: string): Promise<FavoriteProducts[]> {
    const favoriteProducts = await this.ormRepository.find({
      where: { clientId },
    });

    const newFavoriteProducts: FavoriteProducts[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of favoriteProducts) {
      // eslint-disable-next-line no-await-in-loop
      const response = await this.productsRepository.findById(item.productId);

      if (response) {
        item.product = response;
      }

      newFavoriteProducts.push(item);
    }

    return newFavoriteProducts;
  }

  findByProductIdAndClientId({
    clientId,
    productId,
  }: ICreateFavoriteProductsDTO): Promise<FavoriteProducts | undefined> {
    const favoriteProducts = this.ormRepository.findOne({
      where: { clientId, productId },
    });

    return favoriteProducts;
  }

  public async create(
    FavoriteProductsData: ICreateFavoriteProductsDTO,
  ): Promise<FavoriteProducts> {
    const favoriteProducts = this.ormRepository.create(FavoriteProductsData);

    await this.ormRepository.save(favoriteProducts);

    return favoriteProducts;
  }

  public async delete(
    favoriteProducts: FavoriteProducts,
  ): Promise<FavoriteProducts> {
    return this.ormRepository.remove(favoriteProducts);
  }
}

export default FavoriteProductsRepository;

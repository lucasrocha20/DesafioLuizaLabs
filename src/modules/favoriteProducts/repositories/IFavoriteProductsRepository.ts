import FavoriteProducts from '../infra/typeorm/entities/FavoriteProducts';

import ICreateFavoriteProductsDTO from '../dtos/ICreateFavoriteProductsDTO';

export default interface IFavoriteProductsRepository {
  findByClientId(clientId: string): Promise<FavoriteProducts[]>;
  findByProductIdAndClientId(
    data: ICreateFavoriteProductsDTO,
  ): Promise<FavoriteProducts | undefined>;
  create(data: ICreateFavoriteProductsDTO): Promise<FavoriteProducts>;
  delete(favoriteProducts: FavoriteProducts): Promise<FavoriteProducts>;
}

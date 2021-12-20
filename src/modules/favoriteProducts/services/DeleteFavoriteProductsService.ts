import AppError from '@shared/errors/AppError';
import FavoriteProducts from '../infra/typeorm/entities/FavoriteProducts';
import IFavoriteProductsRepository from '../repositories/IFavoriteProductsRepository';

interface IRequest {
  clientId: string;
  productId: string;
}

class DeleteFavoriteProductsService {
  constructor(
    private favoriteProductsRepository: IFavoriteProductsRepository,
  ) {}

  public async execute(data: IRequest): Promise<FavoriteProducts> {
    const favoriteProduct =
      await this.favoriteProductsRepository.findByProductIdAndClientId(data);

    if (!favoriteProduct) {
      throw new AppError('Favorite product not found.', 400);
    }

    await this.favoriteProductsRepository.delete(favoriteProduct);

    return favoriteProduct;
  }
}

export default DeleteFavoriteProductsService;

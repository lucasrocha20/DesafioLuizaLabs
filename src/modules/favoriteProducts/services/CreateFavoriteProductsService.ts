import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';

import FavoriteProducts from '../infra/typeorm/entities/FavoriteProducts';
import IFavoriteProductsRepository from '../repositories/IFavoriteProductsRepository';

interface IRequestDTO {
  clientId: string;
  productId: string;
}

class CreateFavoriteProductsService {
  constructor(
    private favoriteProductsRepository: IFavoriteProductsRepository,
    private clientsRepository: IClientsRepository,
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    clientId,
    productId,
  }: IRequestDTO): Promise<FavoriteProducts> {
    const checkClientExists = await this.clientsRepository.findById(clientId);

    if (!checkClientExists) {
      throw new AppError('Client not exists.', 400);
    }

    const checkProductExists = await this.productsRepository.findById(
      productId,
    );

    if (!checkProductExists) {
      throw new AppError('Product not found.', 400);
    }

    const favoriteProductsExists =
      await this.favoriteProductsRepository.findByProductIdAndClientId({
        clientId,
        productId,
      });

    if (favoriteProductsExists) {
      throw new AppError('Product already exists for this client.', 400);
    }

    const favoriteProducts = await this.favoriteProductsRepository.create({
      clientId,
      productId,
    });

    return favoriteProducts;
  }
}

export default CreateFavoriteProductsService;

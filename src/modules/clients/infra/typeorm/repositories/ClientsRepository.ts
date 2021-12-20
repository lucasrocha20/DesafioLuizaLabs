import { getRepository, Repository } from 'typeorm';

import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/external/repositories/ProductsRepository';
import FavoriteProducts from '@modules/favoriteProducts/infra/typeorm/entities/FavoriteProducts';
import Client from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  private productsRepository: IProductsRepository = new ProductsRepository();

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  async findById(id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      where: { id },
      relations: ['favoriteProducts'],
    });

    const newFavoriteProducts: FavoriteProducts[] = [];

    if (client?.favoriteProducts) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of client.favoriteProducts) {
        // eslint-disable-next-line no-await-in-loop
        const response = await this.productsRepository.findById(item.productId);

        if (response) {
          item.product = response;
        }

        newFavoriteProducts.push(item);
      }

      client?.favoriteProducts = newFavoriteProducts;
    }

    return client;
  }

  async find(page = 1, perPage = 10): Promise<Client[]> {
    const client = await this.ormRepository.find({
      relations: ['favoriteProducts'],
      // eslint-disable-next-line prettier/prettier
      skip: (perPage * page) - perPage,
      take: perPage,
    });

    let newFavoriteProducts: FavoriteProducts[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const clientItem of client) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of clientItem.favoriteProducts) {
        // eslint-disable-next-line no-await-in-loop
        const response = await this.productsRepository.findById(item.productId);

        if (response) {
          item.product = response;
        }

        newFavoriteProducts.push(item);
      }
      clientItem.favoriteProducts = newFavoriteProducts;
      newFavoriteProducts = [];
    }

    return client;
  }

  findByEmail(email: string): Promise<Client | undefined> {
    const client = this.ormRepository.findOne({ where: { email } });

    return client;
  }

  public async create(ClientData: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create(ClientData);

    await this.ormRepository.save(client);

    return client;
  }

  public async update(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }

  public async delete(client: Client): Promise<Client> {
    return this.ormRepository.remove(client);
  }
}

export default ClientsRepository;

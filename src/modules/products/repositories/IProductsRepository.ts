import IRequestProductDTO from '../dtos/IRequestProductDTO';

export default interface IProductsRepository {
  findById(id: string): Promise<IRequestProductDTO | undefined>;
}

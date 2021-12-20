import Client from '../infra/typeorm/entities/Client';

import ICreateClientDTO from '../dtos/ICreateClientDTO';

export default interface IClientsRepository {
  find(page?: number, perPage?: number): Promise<Client[]>;
  findById(id: string): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
  create(data: ICreateClientDTO): Promise<Client>;
  update(client: Client): Promise<Client>;
  delete(client: Client): Promise<Client>;
}

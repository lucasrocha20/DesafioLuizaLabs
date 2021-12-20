import AppError from '@shared/errors/AppError';
import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  id: string;
}

class DeleteClientService {
  constructor(private clientsRepository: IClientsRepository) {}

  public async execute({ id }: IRequest): Promise<Client> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found.', 404);
    }

    await this.clientsRepository.delete(client);

    return client;
  }
}

export default DeleteClientService;

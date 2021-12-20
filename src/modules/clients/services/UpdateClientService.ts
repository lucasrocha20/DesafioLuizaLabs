import AppError from '@shared/errors/AppError';
import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateClientService {
  constructor(private clientsRepository: IClientsRepository) {}

  public async execute({ id, name, email }: IRequest): Promise<Client> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found.', 404);
    }

    if (email && email !== client.email) {
      const existsClientEmail = await this.clientsRepository.findByEmail(email);

      if (existsClientEmail) {
        throw new AppError('Email address already registered.', 401);
      }

      client.email = email;
    }

    client.name = name;

    await this.clientsRepository.update(client);

    return client;
  }
}

export default UpdateClientService;

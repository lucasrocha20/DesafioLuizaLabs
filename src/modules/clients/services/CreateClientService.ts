import AppError from '@shared/errors/AppError';
import Client from '../infra/typeorm/entities/Client';

import IClientsRepository from '../repositories/IClientsRepository';

interface IRequestDTO {
  name: string;
  email: string;
}

class CreateClientService {
  constructor(private clientsRepository: IClientsRepository) {}

  public async execute({ name, email }: IRequestDTO): Promise<Client> {
    const checkUserExists = await this.clientsRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const user = await this.clientsRepository.create({
      name,
      email,
    });

    return user;
  }
}

export default CreateClientService;

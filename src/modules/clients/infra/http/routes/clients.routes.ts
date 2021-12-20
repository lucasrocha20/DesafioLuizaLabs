import { Router } from 'express';

import CreateClientService from '@modules/clients/services/CreateClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import DeleteClientService from '@modules/clients/services/DeleteClientService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ClientsRepository from '../../typeorm/repositories/ClientsRepository';

const clientsRouter = Router();

interface IQuery {
  page: number;
  perPage: number;
}

clientsRouter.get('/', ensureAuthenticated, async (req, res) => {
  const { page, perPage } = req.query as unknown as IQuery;

  const clientsRepository = new ClientsRepository();
  const clients = await clientsRepository.find(page, perPage);

  return res.json(clients);
});

clientsRouter.get('/:id', ensureAuthenticated, async (req, res) => {
  const { id } = req.params;

  const clientsRepository = new ClientsRepository();
  const client = await clientsRepository.findById(id);

  return res.json(client);
});

clientsRouter.post('/', ensureAuthenticated, async (req, res) => {
  const { name, email } = req.body;

  const clientsRepository = new ClientsRepository();
  const createClient = new CreateClientService(clientsRepository);

  const client = await createClient.execute({
    name,
    email,
  });

  return res.json(client);
});

clientsRouter.put('/:id', ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const clientsRepository = new ClientsRepository();
  const updateClient = new UpdateClientService(clientsRepository);

  const client = await updateClient.execute({
    id,
    email,
    name,
  });

  return res.json(client);
});

clientsRouter.delete('/:id', ensureAuthenticated, async (req, res) => {
  const { id } = req.params;

  const clientsRepository = new ClientsRepository();
  const deleteClient = new DeleteClientService(clientsRepository);

  await deleteClient.execute({ id });

  return res.json();
});

export default clientsRouter;

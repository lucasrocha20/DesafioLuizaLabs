import { Router } from 'express';

import CreateFavoriteProductsService from '@modules/favoriteProducts/services/CreateFavoriteProductsService';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import DeleteFavoriteProductsService from '@modules/favoriteProducts/services/DeleteFavoriteProductsService';
import ProductsRepository from '@modules/products/infra/external/repositories/ProductsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FavoriteProductsRepository from '../../typeorm/repositories/FavoriteProductsRepository';

const favoriteProductsRouter = Router();

favoriteProductsRouter.get(
  '/:clientId',
  ensureAuthenticated,
  async (req, res) => {
    const { clientId } = req.params;

    const favoriteProductsRepository = new FavoriteProductsRepository();
    const favoriteProducts = await favoriteProductsRepository.findByClientId(
      clientId,
    );

    return res.json(favoriteProducts);
  },
);

favoriteProductsRouter.post('/', ensureAuthenticated, async (req, res) => {
  const { clientId, productId } = req.body;

  const favoriteProductsRepository = new FavoriteProductsRepository();
  const clientsRepository = new ClientsRepository();
  const productsRepository = new ProductsRepository();

  const createFavoriteProducts = new CreateFavoriteProductsService(
    favoriteProductsRepository,
    clientsRepository,
    productsRepository,
  );

  const favoriteProducts = await createFavoriteProducts.execute({
    clientId,
    productId,
  });

  return res.json(favoriteProducts);
});

favoriteProductsRouter.delete(
  '/:clientId/:productId',
  ensureAuthenticated,
  async (req, res) => {
    const { clientId, productId } = req.params;

    const favoriteProductsRepository = new FavoriteProductsRepository();
    const deleteFavoriteProducts = new DeleteFavoriteProductsService(
      favoriteProductsRepository,
    );

    await deleteFavoriteProducts.execute({ clientId, productId });

    return res.json();
  },
);

export default favoriteProductsRouter;

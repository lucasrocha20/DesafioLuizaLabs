import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Client from '../../../../clients/infra/typeorm/entities/Client';
import Product from '../../../../products/infra/external/entities/Product';

@Entity('favoriteProducts')
class FavoriteProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clientId: string;

  @ManyToOne(() => Client, client => client.favoriteProducts)
  client: Client;

  @Column()
  productId: string;

  product: Product;
}

export default FavoriteProducts;

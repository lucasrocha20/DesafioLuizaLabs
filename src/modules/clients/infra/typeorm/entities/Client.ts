import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import FavoriteProducts from '../../../../favoriteProducts/infra/typeorm/entities/FavoriteProducts';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(
    () => FavoriteProducts,
    favoriteProducts => favoriteProducts.client,
  )
  favoriteProducts: FavoriteProducts[];
}

export default Client;

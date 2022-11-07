import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Car } from './car.entity';

@Entity()
export class Rent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startdate: string;

  @Column()
  lastdate: string;

  @Column()
  rent_price: number;

  @OneToMany(() => Car, (car: Car) => car.id)
  @Column()
  car_id: string;
}

import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Todo } from "./todo";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstLogin: boolean;

  @OneToMany(() => Todo, (todo => todo.user), {nullable: true})
  @JoinColumn()
  Todo: Todo[]
}
import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne
} from "typeorm";
import { Todo } from "./todo";

@Entity()
export class Todos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({nullable: true })
    status: boolean;

    @ManyToOne(() => Todo, (todo) => todo.Todos)
    todo: Todo
}
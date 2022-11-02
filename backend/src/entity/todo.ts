import { dnsPrefetchControl } from "helmet";
import {
    Entity, PrimaryGeneratedColumn, Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Todos } from "./todos";
import { User } from "./user";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    desc: string;

    @Column({nullable: true })
    date: string;

    @ManyToOne(() => User, (user) => user.Todo)
    user: User

    @OneToMany(() => Todos, (todos => todos.todo), {nullable: true})
    @JoinColumn()
    Todos: Todos[]
}
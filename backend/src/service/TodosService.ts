import { getRepository } from "typeorm";
import { User } from "../entity/user";
import { Todo } from "../entity/todo";
import { Todos } from "../entity/todos";
import { isEmpty } from "../utils/utils";
import bcrypt from 'bcryptjs';

class TodosService {
    async createTodos(todoId: number, title: string) {
        let todos = getRepository(Todos);
        let todo = getRepository(Todo);
        let user = getRepository(User);

        var selectedTodo = await todo.findOne({
            where: { id: todoId }
        })
        console.log(selectedTodo)

        await todos.save({
            todo: selectedTodo,
            status: false,
            title: title,
        })
    }

    async createTodosWithTodo(todoId: number,): Promise<void> {
        let todo = getRepository(Todo);
        let todos = getRepository(Todos);
        let user = getRepository(User);

        var mainTodo = await todo.findOne({where:{
            id: todoId
        }})

        todos.save({
            status: false,
            title: 'Rediger mig!',
            todo: mainTodo,
        })
    }

    async getAllTodos() {
        let todos = getRepository(Todos)

        return await todos.find();
    }

    async getTodosWithTodo(todoId: number) {
        let todos = getRepository(Todos)

        return todos.find({ where: { todo: todoId } })
    }

    async deleteTodo(todoId: number) {
        let todo = getRepository(Todo)

        await todo.delete(todoId)
    }
}

export default new TodosService();
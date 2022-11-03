import { getRepository } from "typeorm";
import { User } from "../entity/user";
import { Todo } from "../entity/todo";
import { Todos } from "../entity/todos";
import { isEmpty } from "../utils/utils";
import bcrypt from 'bcryptjs';
import TodosService from "./TodosService";

class TodoService {
    async createTodo(userId: number, desc: string, date: Date) {
        let todo = getRepository(Todo);
        let user = getRepository(User);

        var sentDate = new Date(date)

        var selectedUser = await user.findOne({ where: { id: userId } })

        var checkTodoExists = await todo.findOne({ where: {
            date: sentDate.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' }),
            user: selectedUser
        }})

        if(!isEmpty(checkTodoExists)){
            console.log("this date already exsist")
            return false;
        }else{   
            await todo.save({
                desc,
                date: sentDate.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' }),
                user: selectedUser
            })
        }
    }

    async createTodoWithTodos(userId: number, tododesc: string, tododate: Date): Promise<void> {
        let todo = getRepository(Todo);
        let todos = getRepository(Todos);
        let user = getRepository(User);
        var sentDate = new Date(tododate)

        var selectedUser = await user.findOne({ where: { id: userId } })

        var mainTodo = await todo.save({
            desc: tododesc,
            date: sentDate.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' }),
            user: selectedUser
        })

        todos.save({
            status: false,
            title: 'Rediger mig!',
            todo: mainTodo,
        })
    }

    async getAllTodos() {
        let todo = getRepository(Todo)

        return await todo.find({
            relations: ['Todos']
        });
    }

    async getTodoWithUser(userId: number) {
        let todo = getRepository(Todo)

        return todo.find({
            where: { user: userId },
            relations: ['Todos']
        })
    }

    async deleteTodo(todoId: number) {
        let todo = getRepository(Todo)

        await todo.delete(todoId)
    }
}

export default new TodoService();
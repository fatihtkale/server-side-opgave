import { getRepository } from "typeorm";
import { User } from "../entity/user";
import { Todo } from "../entity/todo";
import { Todos } from "../entity/todos";
import { isEmpty } from "../utils/utils";
import bcrypt from 'bcryptjs';

class TodoService {
    async createTodo(userId: number, desc: string, date: Date) {
        let todo = getRepository(Todo);
        let user = getRepository(User);

        var sentDate = new Date(date) 

        var selectedUser = await user.findOne({where: {id : userId}})

        await todo.save({
            desc,
            date: sentDate.toLocaleString('default', {day: 'numeric', month: 'long', year:'numeric' }),
            user: selectedUser
        })
    }

    async createTodoWithTodos(userId: number, tododesc: string, tododate: Date) : Promise<void> {
        let todo = getRepository(Todo);
        let todos = getRepository(Todos);
        let user = getRepository(User);
        var sentDate = new Date(tododate) 

        var selectedUser = await user.findOne({where: {id : userId}})
        
        var mainTodo = await todo.save({
            desc: tododesc,
            date: sentDate.toLocaleString('default', {day: 'numeric', month: 'long', year:'numeric' }),
            user: selectedUser
        })

        todos.save({
            status: false,
            title: 'Rediger mig!',
            todo: mainTodo,
        })
    }

    async getAllTodos(){
        let todo = getRepository(Todo)

        return await todo.find();
    }

    async getTodoWithUser(userId: number){
        let todo = getRepository(Todo)
        
        return todo.find({where: { user: userId }})
    }

    async deleteTodo(todoId:number){
        let todo = getRepository(Todo)

        await todo.delete(todoId)
    }
}

export default new TodoService();
import { getRepository } from "typeorm";
import { User } from "../entity/user";
import { Todo } from "../entity/todo";
import { Todos } from "../entity/todos";
import { isEmpty } from "../utils/utils";
import CryptoJS from "crypto-js";

class TodosService {
    async createTodos(todoId: number, title: string) {
        var salt = "hehe"
        let todos = getRepository(Todos);
        let todo = getRepository(Todo);
        let user = getRepository(User);

        var selectedTodo = await todo.findOne({
            where: { id: todoId }
        })

        await todos.save({
            todo: selectedTodo,
            status: false,
            title: CryptoJS.AES.encrypt(title, salt).toString()
        })
    }

    async updateTodosTitle(todosId: number, newTitle: string){
        let todos = getRepository(Todos);
        var salt = "hehe"

        todos.createQueryBuilder()
        .update({
            title: CryptoJS.AES.encrypt(newTitle, salt).toString()
        }).where({
            id: todosId
        }).execute()
    }

    async updateTodosStatus(todosId: number, newTitle: string){
        let todos = getRepository(Todos);
        var salt = "hehe"

        todos.createQueryBuilder()
        .update({
            title: CryptoJS.AES.encrypt(newTitle, salt).toString()
        }).where({
            id: todosId
        }).execute()
    }

    async createTodosWithTodo(todoId: number): Promise<void> {
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
        var salt = "hehe"
        let todos = getRepository(Todos)

        return await todos.find();
    }

    async getTodosWithTodo(todoId: number) {
        var salt = "hehe"
        let todos = getRepository(Todos)

        return todos.find({ where: { todo: todoId } })
    }
}

export default new TodosService();
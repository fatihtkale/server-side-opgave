import { getRepository } from "typeorm";
import { User } from "../entity/user";
import { Todo } from "../entity/todo";
import { Todos } from "../entity/todos";
import { isEmpty } from "../utils/utils";
import TodosService from "./TodosService";
import CryptoJS from "crypto-js";

class TodoService {
    async createTodo(userId: number, desc: string, date: Date) {
        var salt = "hehe"
        let todo = getRepository(Todo);
        let user = getRepository(User);

        var sentDate = new Date(date)

        var selectedUser = await user.findOne({ where: { id: userId } })

        var enDesc = CryptoJS.AES.encrypt(desc, salt).toString()
        var enDate = CryptoJS.AES.encrypt(
            sentDate.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' }), salt).toString()
        var enDesc = CryptoJS.AES.encrypt(desc, salt).toString()

        var checkTodoExists = await todo.findOne({ where: {
            date: enDate.toString(),
            user: selectedUser
        }})

        if(!isEmpty(checkTodoExists)){
            console.log("this date already exsist")
            return false;
        }else{
            await todo.save({
                desc: enDesc.toString(),
                date: enDate.toString(),
                user: selectedUser
            })
        }
    }

    async createTodoWithTodos(userId: number, tododesc: string, tododate: Date): Promise<void> {
        var salt = "hehe"
        let todo = getRepository(Todo);
        let todos = getRepository(Todos);
        let user = getRepository(User);
        var sentDate = new Date(tododate)

        var selectedUser = await user.findOne({ where: { id: userId } })

        var encryptedData = {
            desc: CryptoJS.AES.encrypt(tododesc, salt).toString(),
            date: CryptoJS.AES.encrypt(
                sentDate.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' }),
                salt).toString(),
            title: CryptoJS.AES.encrypt('Rediger Mig!', salt).toString()
        }

        var mainTodo = await todo.save({
            desc: encryptedData.desc,
            date: encryptedData.date,
            user: selectedUser
        })

        todos.save({
            status: false,
            title: encryptedData.title,
            todo: mainTodo,
        })
    }

    async getAllTodos() {
        var salt = "hehe"
        let todo = getRepository(Todo)

        let decryptedList = []

        var res = await todo.find({
            relations: ['Todos']
        });

        var decryptedResponse = res.map(element => {
            element.date = CryptoJS.AES.decrypt(element.date, salt)
            element.desc = CryptoJS.AES.decrypt(element.desc, salt)
            
            let x = element.Todos.map(elementy => {
                elementy.title = CryptoJS.AES.decrypt(elementy.title, salt)
                return elementy
            });

            element.Todos = x

            return element;
        });

        decryptedList = decryptedResponse;

        return decryptedList
    }

    async getTodoWithUser(userId: number) {
        var salt = "hehe"
        let todo = getRepository(Todo)

        var res = await todo.find({
            where: { user: userId },
            relations: ['Todos']
        })

        var decryptedResponse = res.map(element => {
            element.date = CryptoJS.AES.decrypt(element.date, salt).toString(CryptoJS.enc.Utf8);
            element.desc = CryptoJS.AES.decrypt(element.desc, salt).toString(CryptoJS.enc.Utf8);
            
            let x = element.Todos.map(elementy => {
                elementy.title = CryptoJS.AES.decrypt(elementy.title, salt).toString(CryptoJS.enc.Utf8);
                return elementy
            });

            element.Todos = x;
            return element;
        });

        decryptedResponse;

        return decryptedResponse
    }
}

export default new TodoService();
import { getRepository } from "typeorm";
import { User } from "../entity/user";
import { Todo } from "../entity/todo";
import { Todos } from "../entity/todos";
import { isEmpty } from "../utils/utils";
import bcrypt from 'bcryptjs';

class UserService {
    async login(username: string, password: string): Promise<User> {
        var passwordRepo = getRepository(User)

        var results = await passwordRepo.findOne({ where: { username: username } })
        .then(res => {
            if(isEmpty(res)) return

            if (bcrypt.compareSync(password, res.password) == false) {
                return null
            } else {
                return res
            }
        })

        if (isEmpty(results)){
            return null
        } else {
            return results
        }
    }

    async createUser(username: string, password: string): Promise<User> {
        var userRepo = getRepository(User)
        var todoRepo = getRepository(Todo)
        var todosRepo = getRepository(Todos)
        var salt = bcrypt.genSaltSync(10);
        
        var todos = await todosRepo.save({
            desc: '',
            title: '',
            status: false
        });

        var todo = await todoRepo.save({
            desc: '',
            date: '',
            Todos: [todos]
        });

        var user = await userRepo.findOne({ where: { username: username } })
        
        if (isEmpty(user) == false) {
            console.log("notgood")
            console.log(user)
            console.log(isEmpty(user))
            return null
        }

        var newUser = await userRepo.save({
            username,
            password: bcrypt.hashSync(password, salt),
            Todo: [todo],
            firstLogin: true
        })
        
        return newUser;
    }
}

export default new UserService();
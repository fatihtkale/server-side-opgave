import { Router, Request, Response } from "express";
import TodoService from "../service/TodoService";
import { isEmpty } from "../utils/utils";
const router = Router();


router.get("/", async (req: Request, res: Response) => {
  try {
    await res.send(await TodoService.getAllTodos())
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await res.send(await TodoService.getTodoWithUser(parseInt(req.params.id)))
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    var result = await TodoService.createTodo(req.body.userId, '', req.body.date)

    if (result === false) {
      res.send({'status': 'error'})
    } else{
      res.send(result)
    }

  } catch (error) {
    console.log(error);
  }
});

router.post("/todos", async (req: Request, res: Response) => {
  try {
    await res.send(await TodoService.createTodoWithTodos(req.body.userId, '', req.body.date))
  } catch (error) {
    console.log(error);
  }
});



export default router;

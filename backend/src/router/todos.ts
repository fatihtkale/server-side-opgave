import { Router, Request, Response } from "express";
import TodosService from "../service/TodosService";
import { isEmpty } from "../utils/utils";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    await res.send(await TodosService.getAllTodos())
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await res.send(await TodosService.getTodosWithTodo(parseInt(req.params.id)))
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await res.send(await TodosService.createTodos(req.body.todoId, req.body.title))
  } catch (error) {
    console.log(error);
  }
});

export default router;
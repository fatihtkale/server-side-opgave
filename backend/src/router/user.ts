import { Router, Request, Response } from "express";
import UserService from "../service/UserService";
import jwt from 'jsonwebtoken'

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
    var result = await UserService.login(req.body.username, req.body.password);

    console.log(result)

    if (result == null) {
        return res.sendStatus(401)
    } else {
        let token = jwt.sign({ result }, "verycoolsaltnoonewillguess", { expiresIn: 86400 });
        return res.send({ token, status: "ok" });
    }
});

router.post("/", async (req: Request, res: Response) => {
    var result = await UserService.createUser(req.body.username, req.body.password);

    return res.send({result, status: 'ok'})
})

export default router;

import jwt from "jsonwebtoken"
import { Config } from "../utils/config"
let config = new Config;

class JwtService {
    async verifyToken(req, res, next): Promise<any> {
        let token = req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }
    
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }
            console.log(decoded)
            next();
        });
    }
}

export default new JwtService();
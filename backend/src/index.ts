import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import User from "./entity/User";
import {TypeormStore} from "connect-typeorm";
import Session from "./entity/Session";
import {CONFLICT, CREATED, FORBIDDEN} from "http-status-codes";

//todo split into more files
createConnection().then(async connection => {
    const app = express();
    app.use(bodyParser.json());
    app.use(session({
        secret: 'shhhshshshshh',
        resave: false,
        saveUninitialized: false,
        store: new TypeormStore({
            cleanupLimit: 2,
            ttl: 86400
        }).connect(getRepository(Session))
    }));
    app.listen(8080);
    app.post('/login', async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const {email, password} = req.body as User;
        const user = await userRepository.findOne({where: {email, password}});
        if (user) {
            req.session.email = email;
            res.send();
        } else {
            res.status(FORBIDDEN).send();
        }
    });
    app.post('/register', async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const userToRegister = req.body as User;
        const user = await userRepository.findOne({where: {email: userToRegister.email}});
        if (user) {
            res.status(CONFLICT).send();
        } else {
            await userRepository.save(userToRegister);
            res.status(CREATED).send();
        }
    });
    console.log("Server started");
}).catch(error => console.log(error));

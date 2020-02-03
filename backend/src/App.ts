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
import {AnnotationMetadata, AnnotationMetadataKey} from "./controllers/Annotations";

export default class App {
    public readonly express = express();

    constructor(public readonly port: number, public readonly controllers: { new(): any }[]) {
        createConnection().then(() => {
            this.initializeMiddleware();
            this.initializeControllers();
        }).catch(console.log);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log('Server started on :' + this.port);
        })
    }

    private initializeMiddleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(session({
            secret: 'shhhshshshshh',
            resave: false,
            saveUninitialized: false,
            store: new TypeormStore({
                cleanupLimit: 2,
                ttl: 86400
            }).connect(getRepository(Session))
        }));

        //todo temporary
        this.express.post('/login', async (req: Request, res: Response) => {
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
        this.express.post('/register', async (req: Request, res: Response) => {
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
    }

    private initializeControllers(): void {
        for (const controllerConstructor of this.controllers) {
            const prototype = controllerConstructor.prototype;
            const annotatedMethods: string[] = Object.getOwnPropertyNames(prototype)
                .filter(key => typeof prototype[key] === "function")
                .filter(key => Reflect.hasOwnMetadata(AnnotationMetadataKey, prototype, key));
            const controllerRoute: string = Reflect.getMetadata(AnnotationMetadataKey, controllerConstructor);
            for (const method of annotatedMethods) {
                const [methodSelector, endpointRoute]: AnnotationMetadata = Reflect.getMetadata(AnnotationMetadataKey, prototype, method);
                const route = controllerRoute + endpointRoute;
                // methodSelector(this.express)(route);
                console.log(route);
            }
        }
    }
}

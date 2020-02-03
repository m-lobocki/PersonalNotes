import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import {TypeormStore} from "connect-typeorm";
import Session from "./entity/Session";
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
    }

    private initializeControllers(): void {
        for (const controllerConstructor of this.controllers) {
            const controllerInstance = new controllerConstructor();
            const controllerRoute: string = Reflect.getMetadata(AnnotationMetadataKey, controllerConstructor);
            const prototype = controllerConstructor.prototype;
            Object.getOwnPropertyNames(prototype)
                .filter(key => typeof prototype[key] === "function" && Reflect.hasOwnMetadata(AnnotationMetadataKey, prototype, key))
                .forEach(method => this.invokeAnnotatedMethod(controllerInstance, method, controllerRoute));
        }
    }

    private invokeAnnotatedMethod(controllerInstance: any, annotatedMethod: string, controllerRoute: string): void {
        const [methodSelector, endpointRoute]: AnnotationMetadata = Reflect.getMetadata(AnnotationMetadataKey, controllerInstance, annotatedMethod);
        const route = controllerRoute + endpointRoute;
        const controllerMethod: Function = methodSelector(this.express).bind(this.express);
        controllerMethod(route, controllerInstance[annotatedMethod].bind(controllerInstance));
    }
}

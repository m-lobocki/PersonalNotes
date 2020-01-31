import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";

createConnection().then(async connection => {
    const app = express();
    app.use(bodyParser.json());
    app.use(session({secret: 'shhhshshshshh', resave: false, saveUninitialized: false}));
    app.listen(3000);
    console.log("Server started");
}).catch(error => console.log(error));

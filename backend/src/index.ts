import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import bodyParser = require("body-parser");

createConnection().then(async connection => {
    const app = express();
    app.use(bodyParser.json());
    app.listen(3000);
    console.log("Server started");
}).catch(error => console.log(error));

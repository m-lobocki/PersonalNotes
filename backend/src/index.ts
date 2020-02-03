import App from "./App";
import {Controllers} from "./Controllers";

const app = new App(8080, Controllers);
app.listen();

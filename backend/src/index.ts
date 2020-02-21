import App from "./App";
import Controllers from "./controllers";

const app = new App(8080, Controllers);
app.listen();

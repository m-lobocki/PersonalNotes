import express from "express";

const app = express();
app.get('/hey', (req: any, res: any) => res.send('ho!'));
app.listen(8080);

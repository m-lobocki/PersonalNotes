import express from 'express';

const app = express();
const port = 8080;

app.get('/test', (req, res) => {
    res.send('YAY! It actually works!!!');
});

app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`Server is listening on ${port}`);
});

const express = require('express');
const path = require('path');
const cors = require('cors');
const {audioRouter} = require('./Routers/audioRouter');
const {userRouter} = require('./Routers/userRouter');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(audioRouter)
app.use(userRouter)

app.get('/ok', (req, res) => res.send('ok'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'), err => {
        console.log(err);
    })
})

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});

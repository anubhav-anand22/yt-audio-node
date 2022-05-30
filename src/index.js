const express = require('express');
const path = require('path');
const cors = require('cors');
const {audioRouter} = require('./Routers/audioRouter');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(audioRouter)

app.get('/ok', (req, res) => res.send('ok'));

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});

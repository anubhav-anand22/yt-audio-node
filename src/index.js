const express = require('express');
const path = require('path');
const cors = require('cors');
const {audioRouter} = require('./Routers/audioRouter');
const axios = require('axios');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(audioRouter)

app.get('/ok', (req, res) => res.send('ok'));

app.get('/delay-res', (req, res) => {
    try {
        const you = req.query.you;
        const me = req.query.me

        if(!you || !me) return res.status(400).send('No url provided');

        setTimeout(() => {
            res.send({ok: 'ok'})
            axios(`${you}?me=${you}&you=${me}`);
        }, 10000);
    } catch (e) {
        res.status(500).send();
        console.log(e);
    }
})

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});

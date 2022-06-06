const axios = require('axios');
const https = require('node:https')

const getImgLinkFromListId = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id || typeof id !== 'string') return res.status(400).send();

        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${process.env.YT_API_KEY}`;

        const { data } = await axios(url);

        const thumbnails = data?.items[0]?.snippet?.thumbnails;

        const thumbnail =
            thumbnails['maxres'] ||
            thumbnails['standard'] ||
            thumbnails['high'] ||
            thumbnails['medium'] ||
            thumbnails['default'];

        https.get(thumbnail.url, (stream) => {
            stream.pipe(res);
        })
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports = { getImgLinkFromListId };

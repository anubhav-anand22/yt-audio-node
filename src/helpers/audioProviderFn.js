const ytdl = require('ytdl-core');

const audioProviderFn = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) return res.status(400).send();

        const info = await ytdl.getInfo(
            `https://www.youtube.com/watch?v=${id}`
        );

        const contentLength = info.formats.filter((e) => e.itag === 140)[0]
            .contentLength;

        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Length', contentLength.toString());
        res.setHeader('Content-Type', 'audio/mp3');

        ytdl.downloadFromInfo(info, { quality: '140' }).pipe(res);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports = {
    audioProviderFn
}
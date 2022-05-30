const ytdl = require('ytdl-core');

const getVideoInfoFromId = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) return res.status(400).send();

        const { related_videos, videoDetails } = await ytdl.getBasicInfo(
            `https://www.youtube.com/watch?v=${id}`
        );

        res.send({
            related_videos: related_videos.map(e => {
                let thumbnails = [];
                for(let i of e.thumbnails) {
                    thumbnails.push(i)
                }
                return {
                    id: e.id,
                    title: e.title,
                    thumbnails,
                    authorId: e.author.id,
                    authorName: e.author.name,
                }
            }),
            videoDetails
        });
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports = {getVideoInfoFromId}
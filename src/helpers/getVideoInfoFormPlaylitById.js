const { getVideoFromList } = require("./getVideoFromList");


const getVideoInfoFormPlaylitById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) return res.status(400).send();

        let info = await getVideoFromList('', id, 0);

        info = {
            totalResults: info.totalResults,
            items: info.items.map(e => {
                let thumbnails = [];
                console.log(e.snippet.thumbnails)
                for(let i in e.snippet.thumbnails) {
                    thumbnails.push({
                        type: i,
                        ...e.snippet.thumbnails[i]
                    })
                }
                return {
                    id: e.snippet.resourceId.videoId,
                    title: e.snippet.title,
                    thumbnails,
                    authorId: e.snippet.videoOwnerChannelId,
                    authorName: e.snippet.videoOwnerChannelTitle,
                }
            })
        }

        res.send(info);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
}

module.exports = {getVideoInfoFormPlaylitById}
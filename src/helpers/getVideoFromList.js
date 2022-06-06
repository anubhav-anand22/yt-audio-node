const axios = require('axios')

const getVideoFromList = async (pageToken = '', id, t) => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${
        process.env.YT_API_KEY
    }${pageToken === '' ? '' : `&pageToken=${pageToken}`}`;

    const { data } = await axios(url);

    if (t >= data.pageInfo.totalResults)
        return { items: [], totalResults: data.pageInfo.totalResults };

    const obj = await getVideoFromList(data.nextPageToken, id, t + 50);

    const items = [...data.items, ...obj.items]
    
    return {
        items,
        totalResults: data.pageInfo.totalResults,
    };
};

module.exports = {getVideoFromList}
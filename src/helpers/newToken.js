const { generateToken } = require("./generateToken");
const { client } = require('./mongodb');

const newToken = async (req, res) => {
    try {
        const collection = client.db('YTA').collection('USER');
        const currentTime = new Date().getTime();
        const token = generateToken({ id: req.user._id });

        await collection.updateOne({_id: req.user._id}, {
            $set: {tokens: [token, req.user.tokens.filter(e => e !== req.token).slice(0, 2)], updatedAt: currentTime}
        })

        const returnObj = {
            _id: req.user._id,
            name: req.user.name,
            createdAt: req.user.createdAt,
            updatedAt: currentTime,
            token,
            liked: req.user.liked
        };

        res.send(returnObj)
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports = {newToken}
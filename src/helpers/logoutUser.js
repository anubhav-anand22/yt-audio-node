const {client} = require('./mongodb')

const logoutUser = async (req, res) => {
    try {
        const collection = client.db('YTA').collection('USER');
        const currentTime = new Date().getTime();

        await collection.updateOne({_id: req.user._id}, {
            $set: {tokens: req.user.tokens.filter(e => e !== req.token), updatedAt: currentTime}
        });

        res.send("ok")
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports = {logoutUser};
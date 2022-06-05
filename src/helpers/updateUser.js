const bcrypt = require('bcrypt');
const { client } = require('./mongodb');

const updateUser = async (req, res) => {
    try {
        const name = req?.body?.name || req?.user?.name
        const liked = req?.body?.liked || req?.user?.liked
        const password = req?.body?.password ? await bcrypt.hash(req.body.password, 8) : req?.user?.password
        const currentTime = new Date().getTime();

        await client.db('YTA').collection('USER').updateOne({_id: req.user._id}, {
            $set: {
                name,
                password,
                liked,
                updatedAt: currentTime
            }
        })

        res.send({
            _id: req?.user?._id,
            token: req?.token,
            name: name,
            createdAt: req?.user?.createdAt,
            updatedAt: currentTime,
            liked: liked
        })
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports = {updateUser}
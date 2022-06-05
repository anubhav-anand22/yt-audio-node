const { client } = require("./mongodb");

const getUserById = async (req, res) => {
    const id = req?.params?.id || req?.query?.id;

    if(!id || typeof id !== 'string') return res.status(400).send();

    const user = await client.db('YTA').collection("USER").findOne({_id: id});

    if (!user) return res.status(404).send();

    res.send({
        _id: user?._id,
        name: user?.name,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
    })
}

module.exports = {getUserById}
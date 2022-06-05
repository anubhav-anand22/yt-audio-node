const { client } = require("./mongodb");

const deleteUser = async (req, res) => {
    try {
        await client.db('YTA').collection("USER").deleteOne({_id: req?.user?._id});

        res.send({_id: req?.user?._id});
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports = {deleteUser}
const { client } = require('./mongodb');
const bcrypt = require('bcrypt');
const {generateToken} = require('./generateToken');

const logInUser = async (req, res) => {
    try {
        const name = req?.body?.name?.trim();
        const password = req?.body?.password?.trim();

        if (
            !name ||
            !password ||
            typeof name !== 'string' ||
            typeof password !== 'string'
        )
            return res.status(400).send();

        const collection = client.db('YTA').collection('USER');

        const user = await collection.findOne({ name });

        if (!user) return res.send({ error: `No user with this name` });

        const isMatch = bcrypt.compare(password, user.password)

        if(!isMatch) return res.send({error: "Incorrect password!"});

        const currentTime = new Date().getTime();
        const token = generateToken({ id: user._id });

        await collection.updateOne({name}, {
            $set: {tokens: [token, user.tokens.slice(0, 2)], updatedAt: currentTime}
        })

        const returnObj = {
            _id: user._id,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: currentTime,
            token,
            liked: user.liked
        };

        res.send(returnObj)

    } catch (e) {
        res.status(500).send();
        console.log(e);
    }
};

module.exports = {logInUser}
const { idGenerator } = require('./idGenerator');
const { client } = require('./mongodb');
const bcrypt = require('bcrypt');
const {generateToken} = require('./generateToken');

const signUpUser = async (req, res) => {
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

        const userWithSameName = await collection.findOne({ name });

        if (userWithSameName) return res.send({ error: `Name alreay in use!` });

        const id = idGenerator();
        const hashedPassword = await bcrypt.hash(password, 8);
        const currentTime = new Date().getTime();
        const token = generateToken({ id });

        const userObj = {
            _id: id,
            name,
            password: hashedPassword,
            createdAt: currentTime,
            updatedAt: currentTime,
            tokens: [token],
            liked: {
                video: [],
                playlist: [],
            },
        };

        collection.insertOne(userObj);

        res.send({
            _id: id,
            name,
            createdAt: currentTime,
            updatedAt: currentTime,
            token,
            liked: {video: [], playlist: []}
        });
    } catch (e) {
        res.status(500).send();
        console.log(e);
    }
};

module.exports = { signUpUser };

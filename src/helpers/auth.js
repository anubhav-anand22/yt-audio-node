const jwt = require('jsonwebtoken');
const { client } = require('./mongodb');

const auth = async (req, res, next) => {
    const token = req?.body?.token || req?.query?.token || req?.headers?.authorization?.split(' ')[1];
    if(!token) return res.status(401).send("No token");

    const info = jwt.decode(token, process.env.JWT_SEC);
    const currentTime = new Date().getTime();

    if(!info?.exp || !info.id || info.exp < currentTime) return res.status(401).send();

    const user = await client.db('YTA').collection('USER').findOne({_id: info.id})

    if(!user.tokens.includes(token)) return res.status(401).send("Token did not match with user");

    req.user = user;
    req.token = token;

    next();
}

module.exports = {auth}
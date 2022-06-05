const jwt = require('jsonwebtoken');

const generateToken = (payload = {}, expires = null) => {
    const msInOneDay = 86400000;
    const defaultExpireTime = new Date().getTime() + msInOneDay;
    return jwt.sign(payload, process.env.JWT_SEC, {
        expiresIn: expires || defaultExpireTime,
    });
};

module.exports = {generateToken}
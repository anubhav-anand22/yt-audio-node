const idGenerator = (length = 15) => {
    let output = '', i;
    const set = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for (i = 0; i < length; i++) {
        output += set[Math.floor(Math.random() * set.length)]
    };

    output += `-${new Date().getTime()}`;

    return output;
}

module.exports = {
    idGenerator
}
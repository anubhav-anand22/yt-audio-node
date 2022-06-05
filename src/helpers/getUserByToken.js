const getUserByToken = (req, res) => {
    res.send({
        _id: req?.user?._id,
        token: req?.token,
        name: req?.user?.name,
        createdAt: req?.user?.createdAt,
        updatedAt: req?.user?.updatedAt,
        liked: req?.user?.liked
    })
}

module.exports = {getUserByToken}
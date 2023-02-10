const jwt = require("jsonwebtoken");

const refreshToken = async(req, res) => {
    if (!req.cookies && !req.cookies.chat_room) return res.sendStatus(401);
    const refToken = req.cookies.chat_room;

    jwt.verify(refToken, process.env.REFRESH_SECRET, (error, decoded) => {
        if (error) {
            res.status(401).json({ message: "invalid details" });
        } else {
            const { _id, username } = decoded;
            const token = jwt.sign({ _id, username }, process.env.ACCESS_SECRET, { expiresIn: '5d' });
            res.json({
                _id,
                username,
                token
            });
        }
    })
}

module.exports = refreshToken;
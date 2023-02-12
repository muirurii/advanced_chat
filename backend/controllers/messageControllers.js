const Message = require("../models/Message");

const sendMessage = async(data) => {
    try {
        const message = await Message.create({...data });
        return message;
    } catch (error) {
        return { message: error.message };
    }
}

const getMessages = async(req, res) => {
    const to = req.params.username;
    const from = req.auth.authName;

    try {
        const messages = await Message.find({
            $or: [{
                from,
                to,
            }, {
                from: to,
                to: from
            }]
        });
        // const messages2 = await Message.find({ from: to, to: from });
        res.json({ messages });
    } catch (error) {
        res.status(500).json({ message: "Unable to get messages" });
    }
}

module.exports = {
    sendMessage,
    getMessages
}
const Message = require("../models/Message");

const sendMessage = async(data) => {
    try {
        const message = await Message.create({...data });
        return message;
    } catch (error) {
        return { message: error.message };
    }
};

const getMessages = async(req, res) => {
    const to = req.params.username;
    const from = req.auth.authName;

    try {
        const messages = await Message.find({
            $or: [{
                    from,
                    to,
                },
                {
                    from: to,
                    to: from,
                },
            ],
        });

        await Message.updateMany({
            to: from,
            from: to,
        }, {
            status: {
                seen: true,
                delivered: true,
            },
        });

        res.json({ messages });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Unable to get messages" });
    }
};

module.exports = {
    sendMessage,
    getMessages,
};
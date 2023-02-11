const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }
}, {
    timeStamps: true
});

module.exports = mongoose.model("Message", MessageSchema);
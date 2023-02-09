const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    messages: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: []
    },
    profilePic: {
        type: String,
        default: "/test.jpg"
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
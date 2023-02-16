const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
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
    },
    friends: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: []
    },
    formerFriends: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User",
        default: []
    },
    requests: {
        sent: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "User",
            default: []
        },
        received: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "User",
            default: []
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
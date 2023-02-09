const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const validator = (value) => Boolean(value) && value.length >= 2;

const filterUserDetails = (res, user) => {
    const { _id, username, profilePic, messages } = user;
    const token = jwt.sign({ _id, username }, process.env.ACCESS_SECRET, {
        expiresIn: "1d",
    });
    const refresh = jwt.sign({ _id, username },
        process.env.REFRESH_SECRET, { expiresIn: "10 days" }
    );
    if (res)
        res.cookie("chat_room", refresh, {
            maxAge: 24 * 60 * 60 * 1000 * 10,
            httpOnly: true,
            sameSite: "None",
            path: "/",
            secure: true,
        });
    return {
        _id,
        username,
        messages,
        profilePic,
        token,
    };
};


const registerUser = async(req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (!validator(username) ||
        !validator(password) ||
        !validator(repeatPassword)
    ) {
        return res.status(400).json({ message: "Fill all details" });
    }

    if (password !== repeatPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const duplicate = await User.findOne({ username });

        if (duplicate) {
            return res.status(400).json({ message: "Username exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 6);
        const user = await User.create({ username, password: hashedPassword });
        res.json({ user: filterUserDetails(res, user) })
    } catch (error) {
        res.status(400).json({ message: "Unable  to register. Try again!" })
    }
}

const logIn = async(req, res) => {
    const { username, password } = req.body;

    if (!validator(username) || !validator(password)) {
        return res.status(400).json({ message: "Fill all details" });
    }

    try {

        const user = await User.findOne({ username });

        if (user === null) {
            return res.status(401).json({ message: "Wrong credentials" });
        }

        const passCheck = await bcrypt.compare(password, user.password);

        if (!passCheck) {
            return res.status(401).json({ message: "Wrong credentials" });
        }

        res.json({ user: filterUserDetails(res, user) })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: "Unable  to signin. Try again!" })
    }
}

module.exports = {
    registerUser,
    logIn
}
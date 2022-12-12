const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const validator = (value) => Boolean(value) && value.length >= 2;

const registerUser = async(req, res) => {
    const { username, password, repeatPassword } = req.body;

    console.log(username, password, repeatPassword);

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

        const hashedPassword = await bcrypt.hash(password, 6);
        const user = await User.create({ username, password: hashedPassword });

        res.json({ user })
    } catch (error) {
        console.log(error.message)
        res.json({ message: "Server error" })
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

        res.json({ user })
    } catch (error) {
        console.log(error.message)
        res.json({ message: "Server error" })
    }
}

module.exports = {
    registerUser
}
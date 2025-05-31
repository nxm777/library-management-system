const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validateRegisterData, validateLoginInput } = require("../validators/authValidator");


const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const errors = validateRegisterData(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ message: errors.join(". ") });
        }

        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: "The provided username is already in use" });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "The provided email is already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const { valid, message } = validateLoginInput(req.body);

        if (!valid) {
            return res.status(400).json({ message });
        }

        const user = await User.findOne(email ? { email } : { username });

        if (!user) {
            return res.status(400).json({ message: "Invalid login or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid login or password" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.json({
        token,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture
        }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser, loginUser };

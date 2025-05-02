const bcrypt = require('bcrypt');

const User = require('../../models/userModel');
const generateToken = require('../../utils/jwtHash');

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Validation" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const newUser = await User.createUser({
            firstName,
            lastName,
            username,
            email,
            password:hashedPassword,
        });

        const token = generateToken(newUser);

        res.status(201).json({ message: "User created successfully.", user: newUser, token : token });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "An error occurred while creating the user." });
    }
};

module.exports = createUser;
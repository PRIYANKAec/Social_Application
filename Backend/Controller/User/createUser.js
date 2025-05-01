const User = require('../../models/userModel');

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required." });
        }

        // Create user
        const newUser = await User.createUser({
            firstName,
            lastName,
            username,
            email,
            password,
        });

        res.status(201).json({ message: "User created successfully.", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "An error occurred while creating the user." });
    }
};

module.exports = createUser;
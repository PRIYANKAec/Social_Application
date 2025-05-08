const bcrypt = require('bcrypt');
const yup = require('yup');

const User = require('../../models/userModel');
const { generateToken } = require('../../MiddleWare/jwtHash');

const userSchema = yup.object().shape({
firstName: yup.string().required().max(50),
lastName: yup.string().required().max(50),
username: yup.string().required('UserName is required'),
email:yup.string().email('Invalid email format').required('Email is required'),
password: yup.string().required('Password is required').min(6, 'Password should be atleast 6 characters'),
})


const createUser = async (req, res) => {
    try {

    // Validate request body using Yup
        await userSchema.validate(req.body);

        const { firstName, lastName, username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Validation" });
        }

        const existingUser = await User.findUserByEmail(email);

        if(existingUser)
        {
            return res.status(400).json({ error: "User already exists" });
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
        console.error("Error creating user:", error.message);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = createUser;
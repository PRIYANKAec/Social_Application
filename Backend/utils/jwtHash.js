const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '5h' }
    );
};

const comparePassword = async (password , hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}
module.exports = {generateToken, comparePassword};

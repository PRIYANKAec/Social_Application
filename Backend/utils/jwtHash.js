const jwt = require('jsonwebtoken');

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

module.exports = generateToken;

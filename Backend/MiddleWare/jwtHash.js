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

const verifyToken = async (token) => {
    try {
          return  jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {
        throw new Error('Invalid token');
    }
}

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
}
}

module.exports = {generateToken, comparePassword, verifyToken, authenticateToken};
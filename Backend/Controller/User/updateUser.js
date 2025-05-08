const yup = require("yup");

const UserModel = require("../../models/userModel");

const updateUser = async (req, res) => {
    const schema = yup.object().shape({
        firstName: yup.string().max(50),
        lastName: yup.string().max(50),
        username: yup.string(),
        email: yup.string()
               .email('Invalid email format')
               .matches(/^[\w-.]+@(gmail\.com|yahoo\.com|outlook\.com)$/, 'Only gmail.com, yahoo.com, outlook .com is allowed'),
        phoneNumber: yup.string()
                    .matches(/^[0-9]+$/, 'Phone number must be digits')
                    .length(10, 'Phone number must be 10 digits'),
        address: yup.string(),
    });
    
    try {
        // Validate request body using Yup
        await schema.validate(req.body);

        const { email } = req.user; // Get the email from the authenticated user
        const updateData = req.body;

        //chaeck the presence of user
        const user = await UserModel.findUserByEmail(email);
        if(!user || !email) {
            return res.status(404).json({ error: "User not found" });
        }

        //if the user try to update the password throw error
        if(password in req.body) {
            return res.status(400).json({ error: "Password cannot be updated through this endpoint." });
        }

        // Update user
        const updatedUser = await UserModel.updateUser(email, updateData);

        res.status(200).json({ message: "User updated successfully.", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error.message);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = updateUser;
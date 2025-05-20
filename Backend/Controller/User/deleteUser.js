const UserModel = require("../../models/userModel");

const deleteUser = async (req,res) => {
    const { email } = req.user;

    try {
        // Check if the user exists
        const user = await UserModel.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if(user.email !== email) {
            return res.status(403).json({ error: "You are not authorized to delete this user." });
        }
        
        // Delete the user
        await UserModel.deleteUser(email);

        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ error: error.message });
    }

}
module.exports = deleteUser;
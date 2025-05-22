const yup = require("yup");

const OfficialModel = require("../../models/officialModel");

const updateOfficial = async (req, res) => {
    const schema = yup.object().shape({
        username:     yup.string().max(50),
        email:        yup.string().email('Invalid email format').matches(/^[\w-.]+@(gmail\.com|yahoo\.com|outlook\.com)$/, 'Only gmail.com, yahoo.com, outlook .com is allowed'),
        designation:  yup.string().max(50),
        phoneNumber:  yup.string().matches(/^[0-9]+$/, 'Phone number must be digits').length(10, 'Phone number must be 10 digits'),
    });

    try {
        await schema.validate(req.body);

        const updateData = req.body;
        
        const { GovernmentId } = req.params;
        // The token will decode and attach user info to req.user in authenticateToken middleware
        const tokenUserEmail = req.user?.email;

        const official = await OfficialModel.findOfficialByGovernmentId(GovernmentId);

        if (!official || official.email !== tokenUserEmail) {
            return res.status(403).json({ error: "Unauthorized to update this user." });
        }


        if('password' in req.body) {
            return res.status(400).json({ error: "Password cannot be updated through this endpoint." });
        }

        const updatedOfficial = await OfficialModel.updateOfficial(GovernmentId, updateData);
        res.status(200).json({ message: "User updated successfully.", official: updatedOfficial });
    }
    catch (error) {
        console.error("Error updating user:", error.message);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};
module.exports = updateOfficial;
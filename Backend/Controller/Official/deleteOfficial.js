const OfficialModel = require("../../models/officialModel");

const deleteOfficial = async (req, res) => {
    const tokenUserEmail = req.user.email;
    const { GovernmentId } = req.params;

    try {
        const official = await OfficialModel.findOfficialByGovernmentId(GovernmentId);

        if (!official) {
            return res.status(404).json({ error: "Official not found" });
        }

        // Check if the logged-in user owns this record
        if (official.email !== tokenUserEmail) {
            return res.status(403).json({ error: "You are not authorized to delete this official." });
        }

        // Perform deletion
        await OfficialModel.deleteOfficial(GovernmentId);

        res.status(200).json({ message: "Official deleted successfully." });
    } catch (error) {
        console.error("Error deleting official:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteOfficial;

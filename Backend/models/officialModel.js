const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class OfficialModel {
    static async createOfficial(officialData) {
        return await prisma.official.create({
            data: officialData
        });
    }

    static async findOfficialByEmail(email) {
        return await prisma.official.findUnique({
            where: { email }
        });
    }

    static async findOfficialByGovernmentId(GovernmentId) {
        return await prisma.official.findUnique({
            where: { GovernmentId }
        });
    }

    static async updateOfficial(GovernmentId, updateData) {
        return await prisma.official.update({
            where: { GovernmentId: GovernmentId },
            data: updateData
        });
    }

    static async deleteOfficial(GovernmentId) {
        return await prisma.official.delete({
            where: { GovernmentId },
        });
    }
}

module.exports = OfficialModel;
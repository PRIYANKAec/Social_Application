const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserModel {
    static async createUser(userData) {
        return await prisma.user.create({
            data: userData
        })
    }

    static async findUserByEmail(email) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    static async updateUser(email, updateData) {
        return await prisma.user.update({
            where: { email },
            data: updateData
        });
    }
}

module.exports = UserModel; 
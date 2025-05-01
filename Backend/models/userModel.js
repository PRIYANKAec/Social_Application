const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserModel {
    static async createUser(userData) {
        return await prisma.user.create({
            data: userData
        })
    }
}

module.exports = UserModel; 
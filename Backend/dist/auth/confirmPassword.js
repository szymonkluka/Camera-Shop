"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function confirmPassword() {
    const username = 'Simon';
    const inputPassword = 'Kluka';
    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) {
        console.log('User not found');
        return;
    }
    const isPasswordMatch = await (0, bcrypt_1.compare)(inputPassword, user.password);
    console.log('Password match:', isPasswordMatch);
}
confirmPassword()
    .catch((error) => {
    console.error('Error occurred:', error);
})
    .finally(() => {
    prisma.$disconnect();
});
//# sourceMappingURL=confirmPassword.js.map
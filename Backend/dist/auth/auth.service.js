"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../shared/services/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async createUser(userData) {
        const hashedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        const userDataWithHashedPassword = Object.assign(Object.assign({}, userData), { password: hashedPassword });
        return this.prisma.users.create({ data: userDataWithHashedPassword });
    }
    async validateUser(username, inputPassword) {
        const user = await this.prisma.users.findUnique({ where: { username } });
        if (!user) {
            return null;
        }
        const isPasswordMatch = await (0, bcrypt_1.compare)(inputPassword, user.password);
        if (isPasswordMatch) {
            return user;
        }
        return null;
    }
    async getAllUsers() {
        return this.prisma.users.findMany();
    }
    async deleteUserById(id) {
        return this.prisma.users.delete({ where: { id } });
    }
    async login(username, password) {
        const user = await this.validateUser(username, password);
        if (!user) {
            console.log('Invalid credentials. User not found or password mismatch.');
            return { message: 'Invalid credentials' };
        }
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
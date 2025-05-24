"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminService = exports.AuthError = void 0;
const db_1 = __importDefault(require("../../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// A simple custom error class for consistent error handling
class AuthError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'AuthError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}
exports.AuthError = AuthError;
const loginAdminService = async (username, plainTextPassword) => {
    const client = await db_1.default.connect();
    try {
        const result = await client.query('SELECT id, username, hashed_password, name, is_active FROM AdminUsers WHERE username = $1', [username]);
        const adminUser = result.rows[0];
        if (!adminUser) {
            throw new AuthError(404, 'Admin user not found.');
        }
        if (!adminUser.is_active) {
            throw new AuthError(403, 'Admin account is inactive. Please contact support.');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(plainTextPassword, adminUser.hashed_password);
        if (!isPasswordValid) {
            throw new AuthError(401, 'Invalid username or password.'); // Generic message for security
        }
        // Password is valid, generate JWT
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("CRITICAL: JWT_SECRET is not defined in environment variables!");
            throw new AuthError(500, 'Internal server configuration error.');
        }
        const tokenPayload = {
            userId: adminUser.id,
            username: adminUser.username,
            // role: adminUser.role, // If you add roles later
        };
        const token = jsonwebtoken_1.default.sign(tokenPayload, jwtSecret, { expiresIn: '1d' }); // Token expires in 1 day
        // Prepare user data to return (excluding the hashed password)
        const { hashed_password, ...userToReturn } = adminUser;
        return { token, user: userToReturn };
    }
    finally {
        client.release();
    }
};
exports.loginAdminService = loginAdminService;

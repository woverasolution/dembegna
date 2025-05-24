import pool from '../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminUser } from '@dembegna/shared-types'; // Assuming you'll refine this type

// A simple custom error class for consistent error handling
export class AuthError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.name = 'AuthError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}

export const loginAdminService = async (username: string, plainTextPassword: string): Promise<{ token: string; user: Omit<AdminUser, 'hashed_password'> }> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT id, username, hashed_password, name, is_active FROM AdminUsers WHERE username = $1',
            [username]
        );

        const adminUser = result.rows[0];

        if (!adminUser) {
            throw new AuthError(404, 'Admin user not found.');
        }

        if (!adminUser.is_active) {
            throw new AuthError(403, 'Admin account is inactive. Please contact support.');
        }

        const isPasswordValid = await bcrypt.compare(plainTextPassword, adminUser.hashed_password);
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

        const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '1d' }); // Token expires in 1 day

        // Prepare user data to return (excluding the hashed password)
        const { hashed_password, ...userToReturn } = adminUser;

        return { token, user: userToReturn as Omit<AdminUser, 'hashed_password'> };

    } finally {
        client.release();
    }
}; 
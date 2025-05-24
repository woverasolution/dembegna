"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminController = exports.signUpController = void 0;
const shared_types_1 = require("@dembegna/shared-types");
const zod_1 = require("zod");
const customers_service_1 = require("../customers/customers.service");
const auth_service_1 = require("./auth.service");
const signUpController = async (req, res) => {
    try {
        const validatedData = shared_types_1.signUpSchema.parse(req.body);
        console.log('Processing signup for:', validatedData.name);
        // Call the customer creation service
        const newCustomer = await (0, customers_service_1.createCustomerService)(validatedData);
        res.status(201).json({
            success: true,
            message: 'User registered successfully. Welcome to Dembegna!',
            data: newCustomer,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            console.error('Validation error during signup:', error.issues);
            return res.status(400).json({
                success: false,
                message: 'Invalid input data.',
                errors: error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                })),
            });
        }
        // Handle specific error from createCustomerService (e.g., duplicate phone number)
        if (error.message === 'Customer with this phone number already exists.') {
            console.warn('Attempt to sign up with existing phone number:', req.body.phoneNumber);
            return res.status(409).json({
                success: false,
                message: error.message,
            });
        }
        console.error('Error in signUpController:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during signup.',
            error: error.message,
        });
    }
};
exports.signUpController = signUpController;
// New Admin Login Controller
const loginAdminController = async (req, res) => {
    try {
        // Validate request body against Zod schema for admin login
        const { username, password } = shared_types_1.loginAdminSchema.parse(req.body);
        const { token, user } = await (0, auth_service_1.loginAdminService)(username, password);
        res.status(200).json({
            success: true,
            message: 'Admin login successful.',
            data: { token, user },
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            console.error('Validation error during admin login:', error.issues);
            return res.status(400).json({
                success: false,
                message: 'Invalid input data for admin login.',
                errors: error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                })),
            });
        }
        if (error instanceof auth_service_1.AuthError) {
            console.warn(`AuthError during admin login for user ${req.body.username || 'unknown'}: ${error.message}`);
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }
        console.error('Error in loginAdminController:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during admin login.',
            error: error.message,
        });
    }
};
exports.loginAdminController = loginAdminController;

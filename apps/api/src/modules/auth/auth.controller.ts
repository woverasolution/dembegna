import { Request, Response } from 'express';
import { signUpSchema, SignUpData, LoginAdminData, loginAdminSchema } from '@dembegna/shared-types';
import { ZodError } from 'zod';
import { createCustomerService } from '../customers/customers.service';
import { loginAdminService, AuthError } from './auth.service';

export const signUpController = async (req: Request, res: Response) => {
  try {
    const validatedData: SignUpData = signUpSchema.parse(req.body);
    console.log('Processing signup for:', validatedData.name);

    // Call the customer creation service
    const newCustomer = await createCustomerService(validatedData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Welcome to Dembegna!',
      data: newCustomer,
    });

  } catch (error: any) {
    if (error instanceof ZodError) { 
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
      return res.status(409).json({ // 409 Conflict
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

// New Admin Login Controller
export const loginAdminController = async (req: Request, res: Response) => {
  try {
    // Validate request body against Zod schema for admin login
    const { username, password }: LoginAdminData = loginAdminSchema.parse(req.body);

    const { token, user } = await loginAdminService(username, password);

    res.status(200).json({
      success: true,
      message: 'Admin login successful.',
      data: { token, user },
    });

  } catch (error: any) {
    if (error instanceof ZodError) {
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
    
    if (error instanceof AuthError) {
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
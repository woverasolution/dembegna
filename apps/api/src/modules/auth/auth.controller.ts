import { Request, Response } from 'express';
import { signUpSchema, SignUpData } from '@dembegna/shared-types';
import { ZodError } from 'zod';

export const signUpController = async (req: Request, res: Response) => {
  try {
    // Validate request body against the schema
    const validatedData: SignUpData = signUpSchema.parse(req.body);

    // For V1, just log the data. Later, this will involve database interaction.
    console.log('New user signup attempt:', validatedData);

    // Simulate user creation or saving to DB
    // In a real app, you would save the user and then perhaps return some user data (excluding sensitive info)
    // or a success message.

    res.status(201).json({
      success: true,
      message: 'User signed up successfully. Welcome to Dembegna!',
      data: {
        name: validatedData.name,
        phoneNumber: validatedData.phoneNumber,
        // Avoid sending back sensitive details or irrelevant flags unless necessary
      },
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      console.error('Validation error:', error.issues);
      return res.status(400).json({
        success: false,
        message: 'Invalid input data.',
        errors: error.issues.map(issue => ({ 
          path: issue.path.join('.'), 
          message: issue.message 
        })),
      });
    }
    console.error('Error in signUpController:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during signup.',
    });
  }
}; 
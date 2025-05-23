// apps/api/src/modules/customers/customers.service.ts
import pool from '../../config/db'; // Assuming your db connection pool is exported from here
import { SignUpData, DembegnaUser } from '@dembegna/shared-types'; // For customer creation type

// Placeholder service to find all customers
export const findAllCustomers = async () => {
  // Example: const result = await pool.query('SELECT id, name, phone_number, created_at FROM customers ORDER BY created_at DESC');
  // return result.rows;
  console.log('TODO: Database logic for findAllCustomers');
  return [{ id: 'placeholder-uuid', name: 'Placeholder Customer', phoneNumber: '0900000000'}];
};

// Placeholder service to find a customer by ID
export const findCustomerById = async (customerId: string) => {
  // Example: const result = await pool.query('SELECT id, name, phone_number, created_at FROM customers WHERE id = $1', [customerId]);
  // return result.rows[0];
  console.log(`TODO: Database logic for findCustomerById: ${customerId}`);
  if (customerId === 'placeholder-uuid') {
    return { id: customerId, name: 'Placeholder Customer', phoneNumber: '0900000000' };
  }
  return null;
};

// Service for creating a customer (adapted from your example)
export const createCustomerService = async (payload: SignUpData): Promise<DembegnaUser> => {
    const { name, phoneNumber, smsConsent } = payload;
    const client = await pool.connect();
    try {
        // Check if phone number already exists
        const existingUserResult = await client.query(
            'SELECT id FROM public.dembegnausers WHERE phone_number = $1',
            [phoneNumber]
        );

        if (existingUserResult.rows.length > 0) {
            // Consider a more specific error type or code for the controller to handle
            throw new Error('Customer with this phone number already exists.');
        }

        // Insert new customer
        // Assuming DembegnaUsers table has columns: name, phone_number, sms_consent, stamps_count etc.
        // and that created_at, updated_at are handled by the DB (e.g. DEFAULT NOW())
        const insertResult = await client.query(
            `INSERT INTO public.dembegnausers (name, phone_number, sms_consent, stamps_count)
             VALUES ($1, $2, $3, 0)
             RETURNING id, name, phone_number AS "phoneNumber", sms_consent AS "smsConsent", stamps_count AS "stampsCount", created_at AS "createdAt", updated_at AS "updatedAt"`,
            [name, phoneNumber, smsConsent]
        );
        
        // Make sure the returned columns match the DembegnaUser type from shared-types
        // The aliases (e.g., phone_number AS "phoneNumber") are to help map directly to camelCase properties if your type uses them
        return insertResult.rows[0] as DembegnaUser;
    } finally {
        client.release();
    }
}; 
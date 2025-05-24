"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { validateRequest } from '../../middleware/validateRequest'; // Assuming you have this middleware
// import { getCustomerByIdSchema } from './customers.validation';
// import { getCustomerByIdController, getAllCustomersController } from './customers.controller';
const router = (0, express_1.Router)();
// Placeholder: GET /api/customers - Get all customers
router.get('/', (req, res) => {
    res.json({ message: 'TODO: Implement get all customers' });
});
// Placeholder: GET /api/customers/:customerId - Get customer by ID
// router.get(
//   '/:customerId',
//   validateRequest(getCustomerByIdSchema), // Example validation
//   getCustomerByIdController
// );
// POST /api/customers - This is effectively handled by /api/auth/signup for new customer creation
// If you need a separate endpoint for creating customers outside of signup, define it here.
exports.default = router;

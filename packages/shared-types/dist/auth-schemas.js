import * as z from "zod";
// Basic Ethiopian phone number regex - can be improved for more strictness or international numbers if needed
const phoneRegex = /^([+]?251[-.\s]?)?(0?9)\d{8}$/; // Use regex literal for clarity and correctness
export const signUpSchema = z.object({
    name: z.string().min(2, {
        message: "Please enter a name with at least 2 characters.",
    }).max(100, { message: "Name seems a bit long, try a shorter version?" }),
    phoneNumber: z.string().regex(phoneRegex, {
        message: "Please enter a valid Ethiopian phone number (e.g., 0911223344 or +251911223344).",
    }),
    smsConsent: z.boolean().refine((value) => value === true, {
        message: "To join our loyalty program, please agree to receive SMS updates."
    }),
});
// Schema for Admin Login
export const loginAdminSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

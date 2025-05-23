import * as z from "zod";
export declare const signUpSchema: z.ZodObject<{
    name: z.ZodString;
    phoneNumber: z.ZodString;
    smsConsent: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    phoneNumber: string;
    smsConsent: boolean;
}, {
    name: string;
    phoneNumber: string;
    smsConsent: boolean;
}>;
export type SignUpData = z.infer<typeof signUpSchema>;

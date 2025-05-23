// apps/customer-frontend/src/app/page.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
// To use toast notifications, ensure Toaster is in your layout.tsx
// import { toast } from "@/components/ui/use-toast"; 

// 1. Define your form schema with Zod
// Basic Ethiopian phone number regex - can be improved for more strictness or international numbers if needed
const phoneRegex = new RegExp(
  /^([+]?251[-.\s]?)?(0?9)\d{8}$/ // Matches +2519... or 09...
); 

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter a name with at least 2 characters.",
  }).max(100, { message: "Name seems a bit long, try a shorter version?"}),
  phoneNumber: z.string().regex(phoneRegex, {
    message: "Please enter a valid Ethiopian phone number (e.g., 0911223344 or +251911223344).",
  }),
  // Making SMS consent truly optional by not using .refine to check for true,
  // but you can add specific handling in onSubmit if needed, or keep it mandatory as before.
  // For marketable V1, mandatory consent for program communication is common.
  // Let's make it mandatory as per original thought for program function.
  smsConsent: z.boolean().refine(value => value === true, {
    message: "To join our loyalty program, please agree to receive SMS updates."
  }),
});

export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      smsConsent: false, // Default to unchecked
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // V1: Log values. Later: API call to /api/customers/signup
    console.log("Dembegna Loyalty Sign-Up:", values);
    
    // Example: Use shadcn toast for feedback (ensure <Toaster /> is in layout.tsx)
    // toast({
    //   title: "Welcome to Dembegna Loyalty!",
    //   description: (
    //     <div className="mt-2">
    //       <p>Name: {values.name}</p>
    //       <p>Phone: {values.phoneNumber}</p>
    //       <p>We'll send your digital card details shortly!</p>
    //     </div>
    //   ),
    // });

    alert(`Welcome, ${values.name}!\nSign-up successful (check console for details).\nWe'll send your digital card and updates to ${values.phoneNumber}.`);
    form.reset(); // Reset form after successful submission
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white selection:bg-purple-500 selection:text-white">
      <div className="w-full max-w-lg p-8 md:p-10 space-y-8 bg-slate-900/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50">
        <div className="text-center space-y-2">
          {/* Optional: You could add a simple SVG logo here */}
          {/* <img src="/logo.svg" alt="Dembegna Logo" className="w-20 h-20 mx-auto mb-4" /> */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300">
            Join Dembegna
          </h1>
          <p className="text-slate-300 text-base md:text-lg">
            Become a valued Dembegna member & unlock exclusive wine rewards!
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200 font-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Tadesse Alemayehu" 
                      {...field} 
                      className="bg-slate-800 border-slate-700 placeholder:text-slate-500 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ease-in-out" 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200 font-medium">Phone Number (Ethiopia)</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="0911223344 or +251911223344" 
                      {...field} 
                      className="bg-slate-800 border-slate-700 placeholder:text-slate-500 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ease-in-out" 
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-slate-400">
                    Your digital stamp card & event invites will be sent here.
                  </FormDescription>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="smsConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border border-slate-700 p-4 bg-slate-800/50 hover:bg-slate-800/70 transition-colors duration-300">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="smsConsent"
                      className="border-slate-500 data-[state=checked]:bg-purple-500 data-[state=checked]:text-white focus:ring-offset-slate-900 focus:ring-purple-500"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="smsConsent" className="text-sm font-medium text-slate-200 cursor-pointer">
                      I agree to receive program updates & event invitations via SMS.
                    </FormLabel>
                     <FormMessage className="text-red-400 text-xs pt-1" /> 
                  </div>
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-semibold py-3 text-lg rounded-md shadow-lg hover:shadow"
            >
              Join Now & Get Rewards
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
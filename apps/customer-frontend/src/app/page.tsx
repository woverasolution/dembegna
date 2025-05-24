// apps/customer-frontend/src/app/page.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema, type SignUpData } from "@dembegna/shared-types";

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

export default function SignUpPage() {
  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      smsConsent: false, // Default to unchecked
    },
  });

  async function onSubmit(values: SignUpData) {
    console.log("Dembegna Loyalty Sign-Up Attempt:", values);
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${apiBaseUrl}/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Sign-up successful:", result);
        alert(`Welcome, ${values.name}! ${result.message}\nWe'll send your digital card and updates to ${values.phoneNumber}.`);
        form.reset();
      } else {
        console.error("Sign-up failed:", result);
        const errorMessage = result.message || "Sign-up failed. Please try again.";
        // Define a type for the expected error objects from the API
        type ApiErrorDetail = { path: string; message: string };
        const errorDetails = result.errors ? (result.errors as ApiErrorDetail[]).map((e: ApiErrorDetail) => `${e.path}: ${e.message}`).join("\n") : "";
        alert(`Error: ${errorMessage}\n${errorDetails}`);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("An unexpected error occurred. Please check the console and try again.");
    }
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
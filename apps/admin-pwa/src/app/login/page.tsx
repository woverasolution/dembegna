"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react'; // For a nice icon on the button
import { toast } from "sonner"; // Changed from useToast to sonner

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAdmin } from "../../lib/auth"; // Adjusted import path
import type { LoginAdminData } from "@dembegna/shared-types"; // Import the type for credentials
// Ensure Toaster is in apps/admin-pwa/src/app/layout.tsx

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  // Consider adding .email() if usernames are email addresses:
  // username: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function AdminLoginPage() {
  const router = useRouter();

  const form = useForm<LoginAdminData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginAdminData) {
    try {
      const result = await loginAdmin(values);
      console.log("Data returned from loginAdmin service:", result);

      if (result.token) {
        localStorage.setItem('adminAuthToken', result.token);
        if (result.user) {
          localStorage.setItem('adminUser', JSON.stringify(result.user));
        }
        toast.success("Login Successful!", {
          description: `Welcome back, ${result.user?.name || result.user?.username || 'Admin'}!`,
        });
        router.push('/admin/dashboard'); // Or your main admin route
      } else {
        // This case should ideally not be reached if loginAdmin throws an error for non-token responses
        throw new Error("Authentication token not found in response.");
      }
    } catch (error) {
      console.error("Admin Login request error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast.error("Login Error", {
        description: errorMessage,
      });
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-md p-8 md:p-10 space-y-8 bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/60">
        <div className="text-center space-y-2">
          {/* Optional: You could add a simple SVG logo here for admin panel */}
          {/* <KeyRound className="w-12 h-12 mx-auto mb-4 text-blue-400" /> */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400">
            Dembegna Admin
          </h1>
          <p className="text-slate-300 text-base md:text-lg">
            Loyalty Program Management
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200 font-medium">Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your.username" 
                      {...field} 
                      className="bg-slate-700/50 border-slate-600 placeholder:text-slate-500 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out h-12 px-4 text-base" 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200 font-medium">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                      className="bg-slate-700/50 border-slate-600 placeholder:text-slate-500 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out h-12 px-4 text-base" 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 hover:from-blue-600 hover:via-sky-600 hover:to-cyan-600 text-white font-semibold py-3 text-lg rounded-md shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
              disabled={form.formState.isSubmitting}
            >
              <LogIn className="mr-2 h-5 w-5" />
              {form.formState.isSubmitting ? "Authenticating..." : "Secure Login"}
            </Button>
          </form>
        </Form>
        
        <p className="text-xs text-slate-500 text-center pt-4">
          &copy; {new Date().getFullYear()} Dembegna Loyalty Systems. Authorized access only.
        </p>
      </div>
    </main>
  );
}
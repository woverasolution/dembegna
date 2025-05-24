import type { LoginAdminData, AdminLoginResponse, ApiResponse } from "@dembegna/shared-types";

export async function loginAdmin(credentials: LoginAdminData): Promise<AdminLoginResponse> {
  try {
    const response = await fetch("/api/v1/auth/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const fullJsonResponse = await response.json();

    if (!response.ok) {
      const apiErrorResponse = fullJsonResponse as ApiResponse<unknown>; // Or any error shape
      const errorMessage = apiErrorResponse.message || apiErrorResponse.error || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    // If response.ok is true, we expect the ApiResponse<AdminLoginResponse> structure
    const apiResponse = fullJsonResponse as ApiResponse<AdminLoginResponse>;

    if (apiResponse.success && apiResponse.data) {
      return apiResponse.data; // This should be { token: string, user: ... }
    } else {
      const errorMessage = apiResponse.message || apiResponse.error || "Login succeeded (HTTP 2xx) but API indicated failure or missing data.";
      throw new Error(errorMessage);
    }

  } catch (error) {
    console.error("Admin login processing failed in auth.ts:", error);
    if (error instanceof Error) {
      throw error; 
    }
    throw new Error("An unknown error occurred during login processing.");
  }
}

// Example of how you might adjust AdminLoginResponse if the server sends an error object within a 200 OK (less common for login)
// or if you want a consistent error shape from this function:
/*
export interface AdminLoginServiceResponse extends AdminLoginResponse {
  error?: string;
}
*/ 
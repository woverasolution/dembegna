// packages/shared-types/src/index.ts
export interface DembegnaUser { // Renamed from User to be more specific
    id: string;
    name: string;
    phone: string;
  }
  
  export interface StampCard {
    dembegnaUserId: string; 
    stamps: number;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }
  export interface AdminUser {
    id: string; 
    username: string;
    name?: string | null; 
    is_active: boolean;
    created_at: string | Date;
    updated_at: string | Date;
  }
export * from "./auth-schemas.js";
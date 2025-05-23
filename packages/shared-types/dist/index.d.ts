export interface DembegnaUser {
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
export * from "./auth-schemas.js";

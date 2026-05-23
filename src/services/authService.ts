/**
 * authService.ts
 * Service layer untuk endpoint autentikasi SILFAK API
 * Base URL: https://silfak-api.vercel.app/api
 */

import api from "@/lib/axios";

// ---- Types ----
export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  name: string;
  nim: string;
  password: string;
  passwordConfirmation: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: { name: string };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: UserData;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: UserData;
}

// ---- Service Functions ----

/**
 * POST /auth/login
 * Login pengguna, mengembalikan token JWT dan data user
 */
export const login = async (payload: LoginInput): Promise<LoginResponse> => {
  const res = await api.post("/api/auth/login", payload);
  return res.data;
};

/**
 * POST /auth/register
 * Registrasi mahasiswa baru
 */
export const register = async (payload: RegisterInput): Promise<RegisterResponse> => {
  const res = await api.post("/api/auth/register", payload);
  return res.data;
};

/**
 * PUT /auth/change-password
 * Ubah password pengguna yang sedang login (membutuhkan Bearer token)
 */
export const changePassword = async (payload: ChangePasswordInput): Promise<{ success: boolean; message: string }> => {
  const res = await api.put("/api/auth/change-password", payload);
  return res.data;
};

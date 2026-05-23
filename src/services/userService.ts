/**
 * userService.ts
 * Service layer untuk endpoint manajemen pengguna SILFAK API
 * Base URL: https://silfak-api.vercel.app/api
 */

import api from "@/lib/axios";

// ---- Types ----
export interface UserRole {
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: UserRole;
}

export interface CreateOBUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ---- Service Functions ----

/**
 * GET /users
 * Ambil semua pengguna (requires Admin role)
 */
export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  const res = await api.get("/api/users");
  return res.data;
};

/**
 * GET /users/:id
 * Ambil detail pengguna berdasarkan ID
 */
export const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  const res = await api.get(`/api/users/${id}`);
  return res.data;
};

/**
 * POST /users/OB
 * Buat akun OB baru (requires Admin role)
 */
export const createOBUser = async (payload: CreateOBUserInput): Promise<ApiResponse<User>> => {
  const res = await api.post("/api/users/OB", payload);
  return res.data;
};

/**
 * PUT /users/:id
 * Update data pengguna (name, email)
 */
export const updateUser = async (id: string, payload: UpdateUserInput): Promise<ApiResponse<User>> => {
  const res = await api.put(`/api/users/${id}`, payload);
  return res.data;
};

/**
 * PATCH /users/:id/status
 * Toggle status aktif/nonaktif pengguna (requires Admin role)
 */
export const toggleUserStatus = async (id: string): Promise<ApiResponse<User>> => {
  const res = await api.patch(`/api/users/${id}/status`);
  return res.data;
};

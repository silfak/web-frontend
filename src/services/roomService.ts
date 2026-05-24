/**
 * roomService.ts
 * Service layer untuk endpoint manajemen ruangan SILFAK API
 * Base URL: https://silfak-api.vercel.app/api
 */

import api from "@/lib/axios";

// ---- Types ----
export interface Room {
  id: string;
  name: string;
  buildingId: string;
  createdAt: string | null;
  floor: number;
}

export interface CreateRoomInput {
  name: string;
  buildingId: string;
  floor: number;
}

export interface UpdateRoomInput {
  name: string;
  buildingId: string;
  floor: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ---- Service Functions ----

/**
 * GET /rooms
 * Ambil semua data ruangan
 */
export const getAllRooms = async (): Promise<ApiResponse<Room[]>> => {
  const res = await api.get("/api/rooms");
  return res.data;
};

/**
 * GET /rooms/:id
 * Ambil data ruangan berdasarkan ID
 */
export const getRoomById = async (id: string): Promise<ApiResponse<Room>> => {
  const res = await api.get(`/api/rooms/${id}`);
  return res.data;
};

/**
 * POST /rooms
 * Tambah data ruangan baru (requires Admin role)
 */
export const createRoom = async (payload: CreateRoomInput): Promise<ApiResponse<Room>> => {
  const res = await api.post("/api/rooms", payload);
  return res.data;
};

/**
 * PUT /rooms/:id
 * Update data ruangan (requires Admin role)
 */
export const updateRoom = async (id: string, payload: UpdateRoomInput): Promise<ApiResponse<Room>> => {
  const res = await api.put(`/api/rooms/${id}`, payload);
  return res.data;
};

/**
 * DELETE /rooms/:id
 * Hapus data ruangan (requires Admin role)
 */
export const deleteRoom = async (id: string): Promise<{ success: boolean; message: string }> => {
  const res = await api.delete(`/api/rooms/${id}`);
  return res.data;
};

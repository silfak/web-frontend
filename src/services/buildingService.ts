/**
 * buildingService.ts
 * Service layer untuk endpoint manajemen gedung SILFAK API
 * Base URL: https://silfak-api.vercel.app/api
 */

import api from "@/lib/axios";

// ---- Types ----
export interface Building {
  id: string;
  name: string;
  createdAt: string | null;
}

export interface CreateBuildingInput {
  name: string;
}

export interface UpdateBuildingInput {
  name: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ---- Service Functions ----
export const getAllBuildings = async () => {
  const res = await api.get("/buildings"); // 
  return res.data;
};

export const getBuildingById = async (id: string) => {
  const res = await api.get(`/buildings/${id}`); // 
  return res.data;
};

export const createBuilding = async (payload: CreateBuildingInput) => {
  const res = await api.post("/buildings", payload); // 
  return res.data;
};

export const updateBuilding = async (id: string, payload: UpdateBuildingInput) => {
  const res = await api.put(`/buildings/${id}`, payload); // 
  return res.data;
};

export const deleteBuilding = async (id: string) => {
  const res = await api.delete(`/buildings/${id}`); // 
  return res.data;
};
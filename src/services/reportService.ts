/**
 * reportService.ts
 * Service layer untuk endpoint pelaporan SILFAK API
 * Base URL: https://silfak-api.vercel.app/api
 */

import api from "@/lib/axios";

// ---- Types ----
export type ReportStatus = "REPORTED" | "IN_PROGRESS" | "RESOLVED";

export interface Report {
  id: string;
  reporterId: string;
  roomId: string;
  description: string | null;
  imageUrl: string | null;
  status: ReportStatus;
  isUrgent: boolean;
  categoryId: string;
}

export interface CreateReportInput {
  reporterId: string;
  roomId: string;
  description: string;
  imageUrl?: string;
  status?: ReportStatus;
  isUrgent?: boolean;
  categoryId: string;
}

export interface UpdateReportInput {
  reporterId?: string;
  roomId?: string;
  description?: string;
  imageUrl?: string;
  status?: ReportStatus;
  isUrgent?: boolean;
  categoryId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ---- Service Functions ----

/**
 * GET /reports
 * Ambil semua data laporan
 */
export const getAllReports = async (): Promise<ApiResponse<Report[]>> => {
  const res = await api.get("/api/reports");
  return res.data;
};

/**
 * GET /reports/:id
 * Ambil detail laporan berdasarkan ID
 */
export const getReportById = async (id: string): Promise<ApiResponse<Report>> => {
  const res = await api.get(`/api/reports/${id}`);
  return res.data;
};

/**
 * POST /reports
 * Buat laporan baru
 */
export const createReport = async (payload: CreateReportInput): Promise<ApiResponse<Report>> => {
  const res = await api.post("/api/reports", payload);
  return res.data;
};

/**
 * PATCH /reports/:id
 * Update laporan (misal: update status oleh OB)
 */
export const updateReport = async (id: string, payload: UpdateReportInput): Promise<ApiResponse<Report>> => {
  const res = await api.patch(`/api/reports/${id}`, payload);
  return res.data;
};

/**
 * DELETE /reports/:id
 * Hapus laporan (requires Admin role)
 */
export const deleteReport = async (id: string): Promise<{ success: boolean; message: string }> => {
  const res = await api.delete(`/api/reports/${id}`);
  return res.data;
};

// ============================================================
// Shared Types untuk DashboardOB & DashboardAdmin
// ============================================================

import type { ElementType } from "react";

// ----- REPORT (OB) -----
export interface Report {
  id?: string;
  friendlyId?: string;
  tgl?: string;
  lokasi?: string;
  ruang?: string;
  masalah?: string;
  deskripsi?: string;
  status: ReportStatus;
  foto?: string | null;
  catatan?: string;
}

export type ReportStatus = "Reported" | "Inprogress" | "Resolved";

// ----- LAPORAN (ADMIN) -----
export interface LaporanAdmin {
  id: string;
  nama: string;
  gedung: string;
  ruang: string;
  jenis: string;
  tanggal: string;
  jam: string;
  status: LaporanAdminStatus;
  deskripsi?: string;
  foto?: string | null;
}

export type LaporanAdminStatus = "reported" | "inprogress" | "resolved";

// ----- FILTERS (ADMIN) -----
export interface FiltersState {
  search: string;
  status: string;
  startDate: string;
  endDate: string;
  page: number;
}

// ----- MANAJEMEN -----
export interface GedungItem {
  nama: string;
  ruang: number | string;
  gedung?: string;
}

export interface RuanganItem {
  nama: string;
  gedung: string;
}

export interface JenisMasalahItem {
  nama: string;
}

export type UserRole = "mahasiswa" | "ob" | "admin";

export interface UserItem {
  nama: string;
  email: string;
  nim?: string;
  role: UserRole;
  status: boolean;
  password?: string;
}

export type AnyItem = GedungItem | RuanganItem | JenisMasalahItem | UserItem;

// ----- TOAST (ADMIN) -----
export interface ToastItem {
  id: number;
  message: string;
  type: "success" | "error";
}

// ----- EMPTY STATE -----
export interface EmptyStateProps {
  icon?: ElementType;
  title?: string;
  desc?: string;
}

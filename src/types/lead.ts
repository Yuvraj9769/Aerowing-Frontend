import type { LeadSource, LeadStatus } from "@/constants/lead.constants";

export interface Activity {
  type: "created" | "status_change" | "note" | "event";
  title: string;
  description?: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
  activities: Activity[];
}

export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LeadListResponse {
  success: true;
  data: Lead[];
  pagination: Pagination;
}

export interface Stats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  lost: number;
  conversionPercentage: number;
}
export interface StatsResponse {
  success: true;
  data: Stats;
}

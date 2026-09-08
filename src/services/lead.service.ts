import { apiClient } from "@/lib/api-client";
import type {
  Lead,
  LeadInput,
  LeadListResponse,
  StatsResponse,
} from "@/types/lead";
import type { LeadSource, LeadStatus } from "@/constants/lead.constants";

export interface LeadQuery {
  page: number;
  search: string;
  status: LeadStatus | "";
  source: LeadSource | "";
  sortOrder: "asc" | "desc";
}

export const leadService = {

  async getLeads(query: LeadQuery) {

    const { data } = await apiClient.get<LeadListResponse>("/leads", {
      params: {
        ...query,
        limit: 10,
        status: query.status || undefined,
        source: query.source || undefined,
        search: query.search || undefined,
      },
    });

    return data;
  },

  async getLead(id: string) {

    const { data } = await apiClient.get<{ success: true; data: Lead }>(
      `/leads/${id}`,
    );
    return data.data;

  },

  async getStats() {

    const { data } = await apiClient.get<StatsResponse>("/leads/stats");

    return data.data;

  },

  async createLead(payload: LeadInput) {

    const { data } = await apiClient.post<{ success: true; data: Lead }>(
      "/leads",
      payload,
    );
    
    return data.data;
  },

  async updateLead(id: string, payload: LeadInput) {

    const { data } = await apiClient.put<{ success: true; data: Lead }>(
      `/leads/${id}`,
      payload,
    );
    
    return data.data;
  },

  async deleteLead(id: string) {
    await apiClient.delete(`/leads/${id}`);
  },
};

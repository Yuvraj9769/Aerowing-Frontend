import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { leadService, type LeadQuery } from '@/services/lead.service';
import type { LeadInput } from '@/types/lead';

export const leadKeys = {
  lists: ['leads'] as const,
  list: (query: LeadQuery) => ['leads', 'list', query] as const,
  stats: ['lead-stats'] as const,
  detail: (id: string) => ['lead', id] as const,
};

export function useLeads(query: LeadQuery) {
  return useQuery({ queryKey: leadKeys.list(query), queryFn: () => leadService.getLeads(query) });
}

export function useLeadStats() {
  return useQuery({ queryKey: leadKeys.stats, queryFn: leadService.getStats });
}

export function useLead(id: string) {
  return useQuery({ queryKey: leadKeys.detail(id), queryFn: () => leadService.getLead(id), enabled: Boolean(id) });
}

function invalidateLeadData(queryClient: ReturnType<typeof useQueryClient>) {
  
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: leadKeys.lists }),
    queryClient.invalidateQueries({ queryKey: leadKeys.stats }),
  ]);
}

export function useCreateLead() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LeadInput) => leadService.createLead(payload),
    onSuccess: () => invalidateLeadData(queryClient),
  });
}

export function useUpdateLead() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: LeadInput }) => leadService.updateLead(id, payload),
    onSuccess: (lead) => {
      queryClient.setQueryData(leadKeys.detail(lead.id), lead);
      return invalidateLeadData(queryClient);
    },
  });
}

export function useDeleteLead() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => leadService.deleteLead(id),
    onSuccess: () => invalidateLeadData(queryClient),
  });
}

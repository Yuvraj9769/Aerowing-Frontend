"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Layers,
  Plus,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { getApiErrorMessage } from "@/lib/api-client";
import type { LeadQuery } from "@/services/lead.service";
import type { Lead, LeadInput } from "@/types/lead";
import type { LeadSource, LeadStatus } from "@/constants/lead.constants";
import { PAGE_LIMIT } from "@/constants/lead.constants";
import { DeleteLeadDialog } from "./components/delete-lead-dialog";
import { LeadFilters } from "./components/lead-filters";
import { LeadFormDialog } from "./components/lead-form-dialog";
import { LeadTable } from "./components/lead-table";
import { MetricCard } from "./components/metric-card";
import {
  useCreateLead,
  useDeleteLead,
  useLeads,
  useLeadStats,
  useUpdateLead,
} from "./hooks/use-lead-queries";

export function Dashboard() {
  const [filters, setFilters] = useState<LeadQuery>({
    page: 1,
    search: "",
    status: "",
    source: "",
    sortOrder: "desc",
  });
  const debouncedSearch = useDebounce(filters.search);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [deleting, setDeleting] = useState<Lead | null>(null);
  const [notice, setNotice] = useState<{
    message: string;
    success?: boolean;
  } | null>(null);
  const [mutationError, setMutationError] = useState("");

  const effectiveQuery = { ...filters, search: debouncedSearch };
  const leadsQuery = useLeads(effectiveQuery);
  const statsQuery = useLeadStats();
  const createMutation = useCreateLead();
  const updateMutation = useUpdateLead();
  const deleteMutation = useDeleteLead();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (notice) {
      const timer = window.setTimeout(() => setNotice(null), 4000);
      return () => window.clearTimeout(timer);
    }
  }, [notice]);

  useEffect(() => {
    setFilters((current) =>
      current.page === 1 ? current : { ...current, page: 1 },
    );
  }, [debouncedSearch, filters.status, filters.source, filters.sortOrder]);

  const stats = statsQuery.data;
  const metricCards = useMemo(
    () => [
      {
        label: "Total leads",
        value: stats?.total ?? 0,
        icon: UsersRound,
        tone: "blue" as const,
      },
      {
        label: "New leads",
        value: stats?.new ?? 0,
        icon: Clock3,
        tone: "violet" as const,
      },
      {
        label: "Contacted",
        value: stats?.contacted ?? 0,
        icon: BriefcaseBusiness,
        tone: "amber" as const,
      },
      {
        label: "Qualified",
        value: stats?.qualified ?? 0,
        icon: Target,
        tone: "blue" as const,
      },
      {
        label: "Converted",
        value: stats?.converted ?? 0,
        icon: CheckCircle2,
        tone: "green" as const,
      },
      {
        label: "Lost",
        value: stats?.lost ?? 0,
        icon: CircleDollarSign,
        tone: "rose" as const,
      },
      {
        label: "Conversion rate",
        value: `${stats?.conversionPercentage ?? 0}%`,
        icon: TrendingUp,
        tone: "green" as const,
        hint: "Converted / total",
      },
    ],
    [stats],
  );

  const hasFilters = Boolean(
    filters.search ||
      filters.status ||
      filters.source ||
      filters.sortOrder === "asc",
  );

  const setFilter = <K extends keyof LeadQuery>(key: K, value: LeadQuery[K]) =>
    setFilters((current) => ({ ...current, [key]: value, page: 1 }));

  const clearFilters = () =>
    setFilters({
      page: 1,
      search: "",
      status: "",
      source: "",
      sortOrder: "desc",
    });

  const openCreate = () => {
    setMutationError("");
    setEditing(null);
    setFormOpen(true);
  };

  // LeadTableRow is memoized; this keeps its edit callback stable across dashboard updates.
  const openEdit = useCallback((lead: Lead) => {
    setMutationError("");
    setEditing(lead);
    setFormOpen(true);
  }, []);

  const handleSave = (payload: LeadInput) => {
    const onSuccess = () => {
      setFormOpen(false);
      setEditing(null);
      setNotice({
        message: editing
          ? "Lead updated successfully."
          : "Lead created successfully.",
        success: true,
      });
    };
    const onError = (error: unknown) =>
      setMutationError(
        getApiErrorMessage(error, "Unable to save lead. Please try again."),
      );

    if (editing)
      updateMutation.mutate({ id: editing.id, payload }, { onSuccess, onError });
    else createMutation.mutate(payload, { onSuccess, onError });
  };

  const totalPages = leadsQuery.data?.pagination.totalPages || 1;
  const totalLeads = leadsQuery.data?.pagination.total ?? 0;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1520px] space-y-6 sm:space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200/80 shadow-2xs">
                Pulse CRM
              </span>
              <span className="text-xs text-slate-400">Pipeline Dashboard</span>
            </div>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Good morning, Yuvraj <span aria-hidden="true">👋</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Here is what is happening with your sales leads and conversion pipeline today.
            </p>
          </div>

          <Button
            onClick={openCreate}
            className="self-start shadow-sm hover:shadow-md sm:self-auto"
          >
            <Plus size={16} />
            Add new lead
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7">
          {metricCards.map((card) => (
            <MetricCard key={card.label} {...card} />
          ))}
        </div>

        {/* Leads Table Panel */}
        <section className="panel overflow-hidden">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200/80 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <Layers size={17} />
              </div>
              <div>
                <h2 className="text-base font-bold tracking-tight text-slate-900">
                  Lead Pipeline
                </h2>
                <p className="text-xs text-slate-500">
                  {totalLeads} {totalLeads === 1 ? "lead" : "leads"} in current view
                </p>
              </div>
            </div>

            {leadsQuery.isFetching && !leadsQuery.isLoading ? (
              <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-600">
                <Spinner size="sm" />
                Updating pipeline...
              </span>
            ) : null}
          </div>

          <LeadFilters
            search={filters.search}
            status={filters.status as LeadStatus | ""}
            source={filters.source as LeadSource | ""}
            sortOrder={filters.sortOrder}
            onSearch={(value) => setFilter("search", value)}
            onStatus={(value) => setFilter("status", value)}
            onSource={(value) => setFilter("source", value)}
            onSort={(value) => setFilter("sortOrder", value)}
            onClear={clearFilters}
          />

          <LeadTable
            leads={leadsQuery.data?.data ?? []}
            isLoading={leadsQuery.isLoading}
            isError={leadsQuery.isError}
            filtered={hasFilters}
            onRetry={() => void leadsQuery.refetch()}
            onAdd={openCreate}
            onClear={clearFilters}
            onEdit={openEdit}
            onDelete={setDeleting}
          />

          {/* Pagination Controls */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 bg-slate-50/50 px-4 py-3.5 sm:flex-row sm:px-6">
            <p className="text-xs font-medium text-slate-500">
              {totalLeads > 0
                ? `Showing ${(filters.page - 1) * PAGE_LIMIT + 1} to ${Math.min(
                    filters.page * PAGE_LIMIT,
                    totalLeads,
                  )} of ${totalLeads} leads`
                : "No leads to display"}
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page <= 1 || leadsQuery.isFetching}
                onClick={() => setFilter("page", filters.page - 1)}
                className="h-9 px-4 py-2 text-xs font-medium"
              >
                Previous
              </Button>

              <span className="inline-flex h-9 min-w-[105px] items-center justify-center rounded-lg border border-slate-200/90 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-2xs">
                Page {filters.page} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={
                  !leadsQuery.data?.pagination.totalPages ||
                  filters.page >= totalPages ||
                  leadsQuery.isFetching
                }
                onClick={() => setFilter("page", filters.page + 1)}
                className="h-9 px-4 py-2 text-xs font-medium"
              >
                Next
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Alert / Toast Notification */}
      {notice ? (
        <div className="fixed bottom-5 right-5 z-[60] w-[calc(100%-2.5rem)] max-w-sm">
          <Alert
            message={notice.message}
            success={notice.success}
            onDismiss={() => setNotice(null)}
          />
        </div>
      ) : null}

      {/* Create / Edit Modal Dialog */}
      <LeadFormDialog
        open={formOpen}
        lead={editing}
        isSaving={isSaving}
        error={mutationError}
        onClose={() => {
          if (!isSaving) setFormOpen(false);
        }}
        onSubmit={(payload) => {
          setMutationError("");
          handleSave(payload);
        }}
      />

      {/* Delete Confirmation Modal Dialog */}
      <DeleteLeadDialog
        lead={deleting}
        isDeleting={deleteMutation.isPending}
        onCancel={() => setDeleting(null)}
        onConfirm={() =>
          deleting &&
          deleteMutation.mutate(deleting.id, {
            onSuccess: () => {
              setDeleting(null);
              setNotice({
                message: "Lead deleted successfully.",
                success: true,
              });
            },
            onError: () =>
              setNotice({
                message: "Unable to delete lead. Please try again.",
              }),
          })
        }
      />
    </AppShell>
  );
}

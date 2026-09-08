"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  ExternalLink,
  History,
  Mail,
  Phone,
  ShieldAlert,
  UserCheck,
  UserRound,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api-client";
import { LEAD_STATUSES, type LeadStatus } from "@/constants/lead.constants";
import { useLead, useUpdateLead } from "./hooks/use-lead-queries";
import { formatDate, formatDateTime, initials } from "@/utils/format";
import { ActivityTimeline } from "./components/activity-timeline";
import { StatusBadge } from "./components/status-badge";
import { CustomSelect } from "@/components/ui/custom-select";

export function LeadDetails({ id }: { id: string }) {
  const [notice, setNotice] = useState<{
    message: string;
    success?: boolean;
  } | null>(null);

  const query = useLead(id);
  const statusMutation = useUpdateLead();

  if (query.isLoading) {
    return (
      <AppShell>
        <div className="mx-auto max-w-6xl space-y-6">
          <Skeleton className="h-6 w-32 rounded-lg" />
          <div className="panel p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-2xl" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-7 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Skeleton className="h-96 rounded-xl" />
            <Skeleton className="h-96 rounded-xl" />
          </div>
        </div>
      </AppShell>
    );
  }

  if (query.isError || !query.data) {
    return (
      <AppShell>
        <div className="mx-auto max-w-2xl py-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-200">
            <ShieldAlert size={28} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Lead Not Found
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            Unable to load lead details. The record may have been deleted or the backend server may be unavailable.
          </p>
          <div className="mt-6">
            <Link href="/" className="btn-secondary">
              <ArrowLeft size={16} />
              Return to Pipeline
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const lead = query.data;

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to leads pipeline
        </Link>

        {/* Lead Hero Card */}
        <div className="panel p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            {/* Lead Identity */}
            <div className="flex items-start gap-4 sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-md shadow-blue-500/10 ring-4 ring-blue-50">
                {initials(lead.name)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {lead.name}
                  </h1>
                  <StatusBadge status={lead.status} />
                </div>

                <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">{lead.company}</span>
                  <span className="text-slate-300">•</span>
                  <span>Acquired via {lead.source}</span>
                  <span className="text-slate-300">•</span>
                  <span>Added {formatDate(lead.createdAt)}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions & Status Control */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:flex-col md:items-end">
              <div className="w-full sm:w-56">
                <label className="label" htmlFor="lead-status">
                  Pipeline Status
                </label>
                <CustomSelect
                  id="lead-status"
                  value={lead.status}
                  disabled={statusMutation.isPending}
                  isLoading={statusMutation.isPending}
                  onChange={(val) =>
                    statusMutation.mutate(
                      {
                        id,
                        payload: {
                          name: lead.name,
                          email: lead.email,
                          phone: lead.phone,
                          company: lead.company,
                          source: lead.source,
                          status: val as LeadStatus,
                        },
                      },
                      {
                        onSuccess: () =>
                          setNotice({
                            message: "Lead status updated successfully.",
                            success: true,
                          }),
                        onError: (error) =>
                          setNotice({
                            message: getApiErrorMessage(
                              error,
                              "Unable to update status.",
                            ),
                          }),
                      },
                    )
                  }
                  options={LEAD_STATUSES.map((status) => ({
                    label: status,
                    value: status,
                  }))}
                  triggerClassName="font-semibold text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lead Details & Timeline Grid */}
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Information Card */}
          <section className="panel p-5 sm:p-7">
            <div className="mb-6 flex flex-col gap-1 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-bold tracking-tight text-slate-900">
                  Lead Information
                </h2>
                <p className="text-xs text-slate-500">
                  Complete contact details and company profile
                </p>
              </div>
              <span className="text-xs text-slate-400">
                Last updated {formatDateTime(lead.updatedAt)}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Info
                icon={Mail}
                label="Email Address"
                value={lead.email}
                href={`mailto:${lead.email}`}
              />
              <Info
                icon={Phone}
                label="Phone Number"
                value={lead.phone}
                href={`tel:${lead.phone}`}
              />
              <Info icon={Building2} label="Company" value={lead.company} />
              <Info icon={UserRound} label="Acquisition Source" value={lead.source} />
              <Info
                icon={CalendarDays}
                label="Created On"
                value={formatDateTime(lead.createdAt)}
              />
              <Info
                icon={UserCheck}
                label="Assigned Representative"
                value="Yuvraj Salte"
              />
            </div>
          </section>

          {/* Activity Timeline Card */}
          <section className="panel p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <History size={16} />
                </div>
                <div>
                  <h2 className="text-base font-bold tracking-tight text-slate-900">
                    Activity History
                  </h2>
                  <p className="text-xs text-slate-500">
                    Timeline of events and status transitions
                  </p>
                </div>
              </div>
            </div>

            <ActivityTimeline activities={lead.activities} />
          </section>
        </div>

        {/* Floating Notice Alert */}
        {notice ? (
          <div className="fixed bottom-5 right-5 z-50 w-[calc(100%-2.5rem)] max-w-sm">
            <Alert
              message={notice.message}
              success={notice.success}
              onDismiss={() => setNotice(null)}
            />
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}

function Info({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100/90 bg-slate-50/50 p-3.5 transition-colors hover:bg-slate-50">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-slate-600 shadow-xs">
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        {href ? (
          <a
            className="mt-0.5 block truncate text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800 hover:underline"
            href={href}
          >
            {value}
          </a>
        ) : (
          <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

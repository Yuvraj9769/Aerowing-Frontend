"use client";

import Link from "next/link";
import { Building2, Calendar, Eye, Mail, MoreVertical, Pencil, Phone, Tag, Trash2 } from "lucide-react";
import { memo } from "react";
import type { Lead } from "@/types/lead";
import { formatDate, initials } from "@/utils/format";
import { StatusBadge } from "./status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface Props {
  leads: Lead[];
  isLoading: boolean;
  isError: boolean;
  filtered: boolean;
  onRetry: () => void;
  onAdd: () => void;
  onClear: () => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

// Memoized desktop table row
const LeadTableRow = memo(function LeadTableRow({
  lead,
  index, onEdit,
  onDelete,
}: {
  lead: Lead;
  index: number;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}) {
  return (
    <tr className="group border-b border-slate-100 transition-colors hover:bg-blue-50/40">
      <td className="whitespace-nowrap px-5 py-3.5 text-xs font-mono font-medium text-slate-400">
        {index}
      </td>
      <td className="min-w-[200px] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 text-xs font-bold text-blue-700 shadow-xs ring-1 ring-blue-200/50">
            {initials(lead.name)}
          </div>
          <div className="min-w-0">
            <Link
              href={`/leads/${lead.id}`}
              className="block truncate font-semibold text-slate-900 transition-colors hover:text-blue-600"
            >
              {lead.name}
            </Link>
          </div>
        </div>
      </td>
      <td className="max-w-[220px] truncate px-5 py-3.5 text-sm text-slate-600">
        <a
          href={`mailto:${lead.email}`}
          className="transition-colors hover:text-blue-600 hover:underline"
        >
          {lead.email}
        </a>
      </td>
      <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-600 font-mono text-xs">
        <a href={`tel:${lead.phone}`} className="hover:text-blue-600">
          {lead.phone}
        </a>
      </td>
      <td className="max-w-[180px] truncate px-5 py-3.5 text-sm font-medium text-slate-700">
        {lead.company}
      </td>
      <td className="px-5 py-3.5 whitespace-nowrap">
        <StatusBadge status={lead.status} />
      </td>
      <td className="whitespace-nowrap px-5 py-3.5 text-xs text-slate-600">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          {lead.source}
        </span>
      </td>
      <td className="whitespace-nowrap px-5 py-3.5 text-xs text-slate-500">
        {formatDate(lead.createdAt)}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5">
        <div className="flex items-center justify-end gap-1">
          <Link
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600"
            href={`/leads/${lead.id}`}
            aria-label={`View ${lead.name}`}
            title="View Details"
          >
            <Eye size={15} />
          </Link>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            onClick={() => onEdit(lead)}
            aria-label={`Edit ${lead.name}`}
            title="Edit Lead"
          >
            <Pencil size={15} />
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
            onClick={() => onDelete(lead)}
            aria-label={`Delete ${lead.name}`}
            title="Delete Lead"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
});

// Mobile card component for flawless small-screen experience
const LeadMobileCard = memo(function LeadMobileCard({
  lead,
  onEdit,
  onDelete,
}: {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}) {
  return (
    <div className="border-b border-slate-100 p-4 transition-colors hover:bg-slate-50/60 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700 ring-1 ring-blue-200/60">
            {initials(lead.name)}
          </div>
          <div className="min-w-0">
            <Link
              href={`/leads/${lead.id}`}
              className="block truncate font-semibold text-slate-900 hover:text-blue-600"
            >
              {lead.name}
            </Link>
            <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5 truncate">
              <Building2 size={12} className="shrink-0 text-slate-400" />
              {lead.company}
            </p>
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-1.5 text-xs text-slate-600 sm:grid-cols-2">
        <a
          href={`mailto:${lead.email}`}
          className="flex items-center gap-1.5 truncate text-slate-600 hover:text-blue-600"
        >
          <Mail size={13} className="shrink-0 text-slate-400" />
          <span className="truncate">{lead.email}</span>
        </a>
        <a
          href={`tel:${lead.phone}`}
          className="flex items-center gap-1.5 truncate text-slate-600 hover:text-blue-600"
        >
          <Phone size={13} className="shrink-0 text-slate-400" />
          <span>{lead.phone}</span>
        </a>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700">
            <Tag size={10} className="text-slate-400" />
            {lead.source}
          </span>
          <span className="text-[11px] text-slate-400">
            {formatDate(lead.createdAt)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href={`/leads/${lead.id}`}
            className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
            aria-label={`View ${lead.name}`}
          >
            <Eye size={13} />
            View
          </Link>
          <button
            onClick={() => onEdit(lead)}
            className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
            aria-label={`Edit ${lead.name}`}
          >
            <Pencil size={13} />
            Edit
          </button>
          <button
            onClick={() => onDelete(lead)}
            className="inline-flex h-8 items-center rounded-md p-1.5 text-rose-500 hover:bg-rose-50"
            aria-label={`Delete ${lead.name}`}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
});

export function LeadTable({
  leads,
  isLoading,
  isError,
  filtered,
  onRetry,
  onAdd,
  onClear,
  onEdit,
  onDelete,
}: Props) {
  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 space-y-3">
        {/* Desktop skeleton */}
        <div className="hidden md:block space-y-3">
          <div className="grid grid-cols-6 gap-4 pb-2 border-b border-slate-100">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4" />
            ))}
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>

        {/* Mobile skeleton */}
        <div className="md:hidden space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-slate-100 p-4 space-y-2.5">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-36" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-200">
          !
        </div>
        <p className="text-sm font-semibold text-rose-800">
          Unable to load leads from the server.
        </p>
        <p className="mt-1 text-xs text-slate-500 max-w-sm">
          Please check your internet connection or backend server status and try again.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 h-9 px-4 py-2 text-xs font-medium shadow-2xs"
          onClick={onRetry}
        >
          Retry loading
        </Button>
      </div>
    );
  }

  if (!leads.length) {
    return <EmptyState filtered={filtered} onClear={onClear} onAdd={onAdd} />;
  }

  return (
    <div>
      {/* Mobile list view for screens < 768px */}
      <div className="divide-y divide-slate-100 md:hidden">
        {leads.map((lead) => (
          <LeadMobileCard
            key={lead.id}
            lead={lead}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Desktop & tablet table view for screens >= 768px */}
      <div className="hidden md:block table-scroll overflow-x-auto">
        <table className="w-full min-w-[1020px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3">ID</th>
              <th className="px-5 py-3">Lead Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Company</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3">Created</th>
              <th className="px-4 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {leads.map((lead, i) => (
              <LeadTableRow
                key={lead.id}
                lead={lead}
                index={i + 1}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

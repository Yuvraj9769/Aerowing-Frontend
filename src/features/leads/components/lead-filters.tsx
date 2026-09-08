"use client";

import { useMemo } from "react";
import { Search, X } from "lucide-react";
import type { LeadSource, LeadStatus } from "@/constants/lead.constants";
import { LEAD_SOURCES, LEAD_STATUSES } from "@/constants/lead.constants";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/custom-select";

interface Props {
  search: string;
  status: LeadStatus | "";
  source: LeadSource | "";
  sortOrder: "asc" | "desc";
  onSearch: (value: string) => void;
  onStatus: (value: LeadStatus | "") => void;
  onSource: (value: LeadSource | "") => void;
  onSort: (value: "asc" | "desc") => void;
  onClear: () => void;
}

export function LeadFilters({
  search,
  status,
  source,
  sortOrder,
  onSearch,
  onStatus,
  onSource,
  onSort,
  onClear,
}: Props) {
  const activeCount =
    (search ? 1 : 0) +
    (status ? 1 : 0) +
    (source ? 1 : 0) +
    (sortOrder === "asc" ? 1 : 0);

  const statusOptions = useMemo(
    () => [
      { label: "All Statuses", value: "" },
      ...LEAD_STATUSES.map((item) => ({ label: item, value: item })),
    ],
    [],
  );

  const sourceOptions = useMemo(
    () => [
      { label: "All Sources", value: "" },
      ...LEAD_SOURCES.map((item) => ({ label: item, value: item })),
    ],
    [],
  );

  const sortOptions = useMemo(
    () => [
      { label: "Newest first", value: "desc" },
      { label: "Oldest first", value: "asc" },
    ],
    [],
  );

  return (
    <div className="border-b border-slate-200/80 bg-slate-50/50 p-4 sm:px-6">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        {/* Search input with leading icon and quick clear */}
        <div className="relative flex-1 min-w-0 xl:max-w-md">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            className="field pl-9 pr-8 text-xs sm:text-sm"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search leads by name, email, or company..."
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none"
              aria-label="Clear search input"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Custom Filters and Sort Controls */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 xl:flex xl:items-center">
          {/* Status select */}
          <CustomSelect
            value={status}
            onChange={(val) => onStatus(val as LeadStatus | "")}
            options={statusOptions}
            className="w-full xl:w-40"
            ariaLabel="Filter by lead status"
          />

          {/* Source select */}
          <CustomSelect
            value={source}
            onChange={(val) => onSource(val as LeadSource | "")}
            options={sourceOptions}
            className="w-full xl:w-40"
            ariaLabel="Filter by lead source"
          />

          {/* Sort order select */}
          <CustomSelect
            value={sortOrder}
            onChange={(val) => onSort(val as "asc" | "desc")}
            options={sortOptions}
            className="w-full xl:w-36"
            ariaLabel="Sort leads by creation date"
          />

          {/* Active filter clear button */}
          {activeCount > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-10 px-3 py-2 text-xs font-medium text-slate-500 hover:text-rose-600 sm:w-auto"
            >
              <X size={14} className="text-slate-400" />
              Reset ({activeCount})
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

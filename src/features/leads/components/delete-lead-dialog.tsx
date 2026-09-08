"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import type { Lead } from "@/types/lead";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export function DeleteLeadDialog({
  lead,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  lead: Lead | null;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lead && !isDeleting) {
        onCancel();
      }
    };
    if (lead) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lead, isDeleting, onCancel]);

  if (!lead) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
    >
      <div
        className="fixed inset-0"
        aria-hidden="true"
        onClick={() => {
          if (!isDeleting) onCancel();
        }}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-modal animate-in fade-in-0 zoom-in-95 sm:p-7">
        <button
          type="button"
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300"
          aria-label="Close dialog"
          onClick={onCancel}
          disabled={isDeleting}
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-4 ring-rose-50/70">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h2
              id="delete-title"
              className="text-lg font-bold tracking-tight text-slate-900"
            >
              Delete Lead
            </h2>
            <p className="text-xs text-slate-500">
              Permanent removal from pipeline
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Are you sure you want to delete{" "}
          <strong className="font-semibold text-slate-900">{lead.name}</strong> from{" "}
          <span className="font-medium text-slate-800">{lead.company}</span>? All associated
          history and timeline records will be permanently removed.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isDeleting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-full sm:w-auto min-w-28"
          >
            {isDeleting ? (
              <>
                <Spinner light size="sm" />
                Deleting...
              </>
            ) : (
              "Delete Lead"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

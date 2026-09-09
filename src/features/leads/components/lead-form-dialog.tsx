"use client";

import { useEffect } from "react";
import { UserPlus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Lead, LeadInput } from "@/types/lead";
import { LEAD_SOURCES, LEAD_STATUSES, type LeadSource, type LeadStatus } from "@/constants/lead.constants";
import { leadFormSchema, type LeadFormValues } from "../schemas/lead.schema";
import { Spinner } from "@/components/ui/spinner";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/custom-select";

interface Props {
  open: boolean;
  lead?: Lead | null;
  isSaving: boolean;
  error?: string;
  onClose: () => void;
  onSubmit: (payload: LeadInput) => void;
}

export function LeadFormDialog({
  open,
  lead,
  isSaving,
  error,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "New",
      source: "Website",
    },
  });

  const currentStatus = watch("status");
  const currentSource = watch("source");

  useEffect(() => {
    if (open) {
      reset(
        lead
          ? {
              name: lead.name,
              email: lead.email,
              phone: lead.phone,
              company: lead.company,
              status: lead.status,
              source: lead.source,
            }
          : {
              name: "",
              email: "",
              phone: "",
              company: "",
              status: "New",
              source: "Website",
            },
      );
    }
  }, [open, lead, reset]);

  // Handle ESC key dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && !isSaving) {
        onClose();
      }
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, isSaving, onClose]);

  if (!open) return null;

  const handleValidSubmit = (values: LeadFormValues) => {
    const payload = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      company: values.company.trim(),
    };
    const requiredTextFields = ["name", "email", "phone", "company"] as const;
    const emptyField = requiredTextFields.find((field) => !payload[field]);

    if (emptyField) {
      const fieldLabels = {
        name: "Name",
        email: "Email",
        phone: "Phone",
        company: "Company",
      };
      setError(emptyField, {
        type: "validate",
        message: `${fieldLabels[emptyField]} is required.`,
      });
      return;
    }

    onSubmit(payload);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm transition-opacity sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-dialog-title"
    >
      <div
        className="fixed inset-0"
        aria-hidden="true"
        onClick={() => {
          if (!isSaving) onClose();
        }}
      />
      <div className="relative z-10 max-h-[92vh] w-full overflow-y-auto table-scroll rounded-t-2xl border border-slate-200 bg-white p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-modal animate-in fade-in-0 zoom-in-95 sm:max-w-lg sm:rounded-2xl sm:p-7">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
              <UserPlus size={18} />
            </div>
            <div>
              <h2
                id="lead-dialog-title"
                className="text-lg font-bold tracking-tight text-slate-900"
              >
                {lead ? "Edit Lead Information" : "Add New Lead"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {lead
                  ? "Update details for this lead in your CRM pipeline."
                  : "Fill in the details below to add a new contact to your CRM."}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-300"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {error ? (
          <div className="mb-5">
            <Alert message={error} />
          </div>
        ) : null}

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleValidSubmit)}
        >
          {/* Full Name */}
          <div>
            <label className="label" htmlFor="name">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className={`field ${errors.name ? "border-rose-300 focus:border-rose-500" : ""}`}
              placeholder="e.g. Sarah Connor"
              {...register("name")}
            />
            {errors.name ? (
              <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
            ) : null}
          </div>

          {/* Email and Phone grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="email">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={`field ${errors.email ? "border-rose-300 focus:border-rose-500" : ""}`}
                placeholder="sarah@example.com"
                {...register("email")}
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
              ) : null}
            </div>

            <div>
              <label className="label" htmlFor="phone">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                className={`field ${errors.phone ? "border-rose-300 focus:border-rose-500" : ""}`}
                placeholder="+1 (555) 000-0000"
                {...register("phone")}
              />
              {errors.phone ? (
                <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p>
              ) : null}
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="label" htmlFor="company">
              Company Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="company"
              type="text"
              className={`field ${errors.company ? "border-rose-300 focus:border-rose-500" : ""}`}
              placeholder="e.g. Acme Corporation"
              {...register("company")}
            />
            {errors.company ? (
              <p className="mt-1 text-xs text-rose-600">{errors.company.message}</p>
            ) : null}
          </div>

          {/* Custom Status and Source Dropdowns */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="status">
                Pipeline Status <span className="text-rose-500">*</span>
              </label>
              <CustomSelect
                id="status"
                value={currentStatus}
                onChange={(val) =>
                  setValue("status", val as LeadStatus, { shouldValidate: true })
                }
                options={LEAD_STATUSES.map((item) => ({
                  label: item,
                  value: item,
                }))}
                triggerClassName={errors.status ? "border-rose-300 focus:border-rose-500" : ""}
              />
              {errors.status ? (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.status.message}
                </p>
              ) : null}
            </div>

            <div>
              <label className="label" htmlFor="source">
                Acquisition Source <span className="text-rose-500">*</span>
              </label>
              <CustomSelect
                id="source"
                value={currentSource}
                onChange={(val) =>
                  setValue("source", val as LeadSource, { shouldValidate: true })
                }
                options={LEAD_SOURCES.map((item) => ({
                  label: item,
                  value: item,
                }))}
                triggerClassName={errors.source ? "border-rose-300 focus:border-rose-500" : ""}
              />
              {errors.source ? (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.source.message}
                </p>
              ) : null}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col-reverse gap-2.5 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto min-w-28"
            >
              {isSaving ? (
                <>
                  <Spinner light size="sm" />
                  Saving...
                </>
              ) : lead ? (
                "Save Changes"
              ) : (
                "Create Lead"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { z } from "zod";
import { LEAD_SOURCES, LEAD_STATUSES } from "@/constants/lead.constants";

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name must be 100 characters or fewer."),

  email: z.string().trim().email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 digits.")
    .max(15, "Phone number must be 15 digits or fewer.")
    .regex(/^\+?[0-9]{7,15}$/, "Enter digits only (7–15), with optional leading +."),

  company: z
    .string()
    .trim()
    .min(1, "Company is required.")
    .max(120, "Company must be 120 characters or fewer."),
    
  status: z.enum(LEAD_STATUSES, { required_error: "Status is required." }),

  source: z.enum(LEAD_SOURCES, { required_error: "Source is required." }),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

import { LeadDetails } from "@/features/leads/lead-details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Details | Pulse CRM",
  description: "View and manage lead details in Pulse CRM.",
  keywords: [
    "CRM",
    "lead management",
    "sales leads",
    "customer relationship management",
  ],
  openGraph: {
    title: "Lead Details | Pulse CRM",
    description: "View and manage lead details in Pulse CRM.",
    url: "https://pulse-crm.com/leads",
  },
};

export default async function LeadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return <LeadDetails id={id} />;
}

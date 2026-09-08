export const LEAD_STATUSES = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_SOURCES = ['Website', 'Referral', 'LinkedIn', 'Google Ads', 'Facebook', 'Email', 'Cold Call', 'Other'] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const PAGE_LIMIT = 10;

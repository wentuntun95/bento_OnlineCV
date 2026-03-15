export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-13";

// These values are optional - Sanity features will be disabled if not set
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// Helper to check if Sanity is properly configured
export const isSanityConfigured = Boolean(dataset && projectId);

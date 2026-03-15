import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId, isSanityConfigured } from "../env";

// Only create client if Sanity is properly configured
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
    })
  : null;

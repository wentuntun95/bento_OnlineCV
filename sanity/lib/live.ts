// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Only export live features if Sanity client is configured
const liveExports = client
  ? defineLive({ client })
  : { sanityFetch: null, SanityLive: null };

export const { sanityFetch, SanityLive } = liveExports;

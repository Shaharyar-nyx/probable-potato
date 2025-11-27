// Remove trailing slashes from all URLs to avoid double slash issues
const removeTrailingSlash = (url: string | undefined) => url?.replace(/\/$/, '') || '';

// Ensure STRAPI_ASSETS has a value
// Priority: 1. STRAPI_ASSETS, 2. Nyxlab_CMS_URL, 3. Extract from STRAPI_GRAPHQL_URL
const strapiAssetsRaw = removeTrailingSlash(process.env.NEXT_PUBLIC_STRAPI_ASSETS);
const cmsUrl = removeTrailingSlash(process.env.NEXT_PUBLIC_Nyxlab_CMS_URL);
const graphqlUrl = removeTrailingSlash(process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL);
const extractedBaseUrl = graphqlUrl?.replace(/\/graphql$/, '') || '';

export const STRAPI_ASSETS = strapiAssetsRaw || cmsUrl || extractedBaseUrl || '';

export const Nyxlab_CMS_URL = cmsUrl;
export const Nyxlab_URL = removeTrailingSlash(process.env.NEXT_PUBLIC_Nyxlab_URL);
export const STRAPI_URL = graphqlUrl;
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// Helper function to build Strapi asset URLs
export const getStrapiAssetUrl = (path?: string) => {
  if (!path) return '';
  // If path is already a full URL, return it as-is
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  // Otherwise, prepend STRAPI_ASSETS (which should always have a value now)
  const baseUrl = STRAPI_ASSETS || 'https://shark-app-tmqz4.ondigitalocean.app'; // Final fallback
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

// Remove trailing slashes from all URLs to avoid double slash issues
const removeTrailingSlash = (url: string | undefined) => url?.replace(/\/$/, '') || '';

// Ensure STRAPI_ASSETS has a value, use a fallback if empty
const strapiAssetsRaw = removeTrailingSlash(process.env.NEXT_PUBLIC_STRAPI_ASSETS);
export const STRAPI_ASSETS = strapiAssetsRaw || 'https://shark-app-tmqz4.ondigitalocean.app';

export const Nyxlab_CMS_URL = removeTrailingSlash(process.env.NEXT_PUBLIC_Nyxlab_CMS_URL);
export const Nyxlab_URL = removeTrailingSlash(process.env.NEXT_PUBLIC_Nyxlab_URL);
export const STRAPI_URL = removeTrailingSlash(process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL);
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// Helper function to build Strapi asset URLs
export const getStrapiAssetUrl = (path?: string) => {
  if (!path) return '';
  // If path is already a full URL, return it as-is
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  // Otherwise, prepend STRAPI_ASSETS
  return `${STRAPI_ASSETS}${path.startsWith('/') ? path : `/${path}`}`;
};

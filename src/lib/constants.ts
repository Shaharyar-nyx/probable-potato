// Remove trailing slashes from all URLs to avoid double slash issues
const removeTrailingSlash = (url: string | undefined) => url?.replace(/\/$/, '') || '';

export const Nyxlab_CMS_URL = removeTrailingSlash(process.env.NEXT_PUBLIC_Nyxlab_CMS_URL);
export const Nyxlab_URL = removeTrailingSlash(process.env.NEXT_PUBLIC_Nyxlab_URL);
export const STRAPI_URL = removeTrailingSlash(process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL);
export const STRAPI_ASSETS = removeTrailingSlash(process.env.NEXT_PUBLIC_STRAPI_ASSETS);
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

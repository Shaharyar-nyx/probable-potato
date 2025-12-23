import { STRAPI_ASSETS } from "./constants";

export interface Ticker {
  id: number;
  title: string;
  cve_id: string;
  description: string;
  link?: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

export type TickerResponse = Ticker[] | {
  data: Array<{
    id: number;
    attributes: {
      title: string;
      cve_id: string;
      description: string;
      link?: string | null;
      order: number;
      createdAt: string;
      updatedAt: string;
      publishedAt?: string | null;
    };
  }>;
  meta?: any;
};

export async function getTickers(): Promise<Ticker[]> {
  try {
    const baseUrl = STRAPI_ASSETS || 'https://shark-app-tmqz4.ondigitalocean.app';
    const url = `${baseUrl}/api/tickers?sort=order:asc&pagination[limit]=10`;
    
    const response = await fetch(url, {
      cache: 'no-store', // Ensure fresh data on each request
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch tickers: ${response.status} ${response.statusText}`);
      return [];
    }

    const json = await response.json();

    let tickers: Ticker[] = [];

    // Handle direct array response (flat structure)
    if (Array.isArray(json)) {
      tickers = json
        .filter((item: any) => item.publishedAt) // Only include published tickers
        .map((item: any) => ({
          id: item.id,
          title: item.title,
          cve_id: item.cve_id,
          description: item.description,
          link: item.link || null,
          order: item.order || 0,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          publishedAt: item.publishedAt || null,
        }))
        .sort((a: Ticker, b: Ticker) => a.order - b.order); // Sort by order
    } 
    // Handle Strapi nested structure (data.attributes)
    else if (json.data && Array.isArray(json.data)) {
      tickers = json.data
        .filter((item: any) => item.attributes?.publishedAt) // Only include published tickers
        .map((item: any) => ({
          id: item.id,
          title: item.attributes.title,
          cve_id: item.attributes.cve_id,
          description: item.attributes.description,
          link: item.attributes.link || null,
          order: item.attributes.order || 0,
          createdAt: item.attributes.createdAt,
          updatedAt: item.attributes.updatedAt,
          publishedAt: item.attributes.publishedAt || null,
        }))
        .sort((a: Ticker, b: Ticker) => a.order - b.order); // Sort by order
    } 
    else {
      console.error('Invalid ticker response structure:', json);
      return [];
    }

    return tickers;
  } catch (error) {
    console.error('Error fetching tickers:', error);
    return [];
  }
}


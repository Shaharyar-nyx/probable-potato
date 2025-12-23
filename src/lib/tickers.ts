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

export interface TickerResponse {
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
}

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

    const json: TickerResponse = await response.json();

    if (!json.data || !Array.isArray(json.data)) {
      console.error('Invalid ticker response structure:', json);
      return [];
    }

    // Transform Strapi response to our Ticker interface
    const tickers: Ticker[] = json.data
      .filter(item => item.attributes.publishedAt) // Only include published tickers
      .map(item => ({
        id: item.id,
        title: item.attributes.title,
        cve_id: item.attributes.cve_id,
        description: item.attributes.description,
        link: item.attributes.link || null,
        order: item.attributes.order,
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
        publishedAt: item.attributes.publishedAt || null,
      }))
      .sort((a, b) => a.order - b.order); // Sort by order

    return tickers;
  } catch (error) {
    console.error('Error fetching tickers:', error);
    return [];
  }
}


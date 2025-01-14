const APOLLO_URL = process.env.NEXT_PUBLIC_APOLLO_URL;
const APOLLO_API_KEY = process.env.NEXT_PUBLIC_APOLLO_API_KEY;

interface ContactResponse {
  contact: {
    id: string;
    [key: string]: any;
  };
}

export const apolloIoClient = {
  async createContact(data: any): Promise<ContactResponse> {
    const response = await fetch(`${APOLLO_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": APOLLO_API_KEY || "",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Apollo.io API error: ${response.statusText}`);
    }

    return response.json();
  },
};

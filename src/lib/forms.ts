import { Nyxlab_CMS_URL } from "./constants";

interface ContactResponse {
  contact: {
    id: string;
    [key: string]: any;
  };
}

export const NyxlabClient = {
  async createContact(data: any): Promise<ContactResponse> {
    const response = await fetch(`${Nyxlab_CMS_URL}/api/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Nyxlab API error: ${response.statusText}`);
    }

    return response.json();
  },
};

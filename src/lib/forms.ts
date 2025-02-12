import { CYBERBAY_CMS_URL } from "./constants";

interface ContactResponse {
  contact: {
    id: string;
    [key: string]: any;
  };
}

export const cyberbayClient = {
  async createContact(data: any): Promise<ContactResponse> {
    const response = await fetch(`${CYBERBAY_CMS_URL}/api/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Cyberbay API error: ${response.statusText}`);
    }

    return response.json();
  },
};

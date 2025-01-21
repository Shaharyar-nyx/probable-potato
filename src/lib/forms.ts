import { CYBERBAY_FORM_URL } from "./constants";

interface ContactResponse {
  contact: {
    id: string;
    [key: string]: any;
  };
}

export const cyberbayClient = {
  async createContact(data: any): Promise<ContactResponse> {
    const response = await fetch(`${CYBERBAY_FORM_URL}`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Cyberbay API error: ${response.statusText}`);
    }

    return response.json();
  },
};

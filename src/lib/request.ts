export const request = async (uri: string, data: any, method: string = "GET") => {
  const baseUrl = process.env.NEXT_PUBLIC_CYBERBAY_CMS_URL;

  const url = [baseUrl?.replace(/\/+$/, ''), uri.replace(/^\/+/, '')].join("/");
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (method === "GET") {
    const params = new URLSearchParams(data ?? {});
    return fetch(`${url}?${params}`, options);
  }

  return fetch(url, {
    ...options,
    body: JSON.stringify(data ?? {}),
  });
};


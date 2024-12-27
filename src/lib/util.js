export function removeLastTrailingSlash(url) {
  if (typeof url !== "string") return url;
  return url.replace(/\/$/, "");
}

export const transformNavigation = (navigation) => {
  return navigation?.map((item) => {
    const newItem = {
      label: item.title,
      path: item.url || null,
    };

    return newItem;
  });
};

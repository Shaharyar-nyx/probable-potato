import { BlogCategoryType } from "@/types";

export const BlogCategories = [
  {
    id: "cybersecurity-news",
    name: "Cybersecurity News",
  },
  {
    id: "personal-protection",
    name: "Personal Protection",
  },
  {
    id: "business-security",
    name: "Business Security",
  },
  {
    id: "technology-and-tools",
    name: "Technology and Tools",
  },
  {
    id: "education-and-resources",
    name: "Education and Resources",
  },
  {
    id: "digital-protection",
    name: "Digital Protection",
  },
  {
    id: "regulations-and-compliance",
    name: "Regulations and Compliance",
  },
] as Array<BlogCategoryType>;

export const getBlogImageUrl = (url?: string) => {
  return url && url.length ? process.env.NEXT_PUBLIC_CYBERBAY_CMS_URL + url : "/images/blogs/default.png";
};

export const getBlogDetailLink = (id: number) => {
  return `/blogs/${id}`;
};

export const stripHtmlTags = (text: string) => {
  const regex = /(<([^>]+)>)/gi;
  return text.replace(regex, "");
};

export const getBlogReadTime = (text: string) => {
  const wordsPerMinute = 200; // Average reading speed
  const content = stripHtmlTags(text);
  const words = content.split(" ").length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return readTime;
};

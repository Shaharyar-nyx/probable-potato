import { BlogCategoryType } from "@/types";
import { getReadTime } from "./utils";
import { getStrapiAssetUrl } from "./constants";

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
  return url && url.length ? getStrapiAssetUrl(url) : "/images/blogs/default.png";
};

export const getBlogDetailLink = (id: number) => {
  return `/blogs/${id}`;
};

export const stripHtmlTags = (text: string) => {
  const regex = /(<([^>]+)>)/gi;
  return text.replace(regex, "");
};

export const markdownToText = (
  md: string,
  options: {
    stripListLeaders?: boolean;
    gfm?: boolean;
  },
): string => {
  options.stripListLeaders = options.hasOwnProperty("stripListLeaders") ? options.stripListLeaders : true;
  options.gfm = options.hasOwnProperty("gfm") ? options.gfm : true;

  let output: string = md;
  try {
    if (options.stripListLeaders) {
      output = output.replace(/^([\s\t]*)([\*\-\+]|\d\.)\s+/gm, "$1");
    }
    if (options.gfm) {
      output = output
        .replace(/\n={2,}/g, "\n")
        .replace(/~~/g, "")
        .replace(/`{3}.*\n/g, "");
    }
    output = output
      .replace(/<[\w|\s|=|\'|\"|\:|\(|\)|\,|\;|\/|0-9|\.|-]+[>|\\>]/g, "")
      .replace(/^[=\-]{2,}\s*$/g, "")
      .replace(/\[\^.+?\](\: .*?$)?/g, "")
      .replace(/\s{0,2}\[.*?\]: .*?$/g, "")
      .replace(/\!\[.*?\][\[\(].*?[\]\)]/g, "")
      .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, "$1")
      .replace(/>/g, "")
      .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, "")
      .replace(/^\#{1,6}\s*([^#]*)\s*(\#{1,6})?/gm, "$1")
      .replace(/([\*_]{1,3})(\S.*?\S)\1/g, "$2")
      .replace(/(`{3,})(.*?)\1/gm, "$2")
      .replace(/^-{3,}\s*$/g, "")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\n{2,}/g, "\n\n");
  } catch (e) {
    console.error(e);
    return md;
  }
  return output;
};

export const getBlogReadTime = (text: string) => {
  const content = stripHtmlTags(markdownToText(text, { stripListLeaders: true, gfm: true }));

  return getReadTime(content);
};

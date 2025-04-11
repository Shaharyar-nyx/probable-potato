import { NewsHero } from "@/sections";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import { request } from "@/lib/request";
import { BlogDetail } from "@/sections/blog/detail";

async function getNewsPage() {
  return getPageBySlug("blogs");
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getNewsPage();

  if (!data?.seo) {
    return {
      title: "Cyberbay",
      description: "",
      openGraph: {
        title: "Cyberbay",
        description: "",
        type: "website",
        siteName: "Cyberbay",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Cyberbay",
        description: "",
      },
    };
  }

  return {
    title: data.seo.title,
    description: data.seo.meta_description,
    keywords: data.seo.keywords,
    robots: {
      index: !data.seo.no_index,
      follow: !data.seo.no_follow,
    },
    openGraph: {
      title: data.seo.title,
      description: data.seo.meta_description,
      images: [{ url: STRAPI_ASSETS + data.seo.og_image?.data?.attributes?.url || "/favicon.ico" }],
      url: data.seo.canonical_url,
      type: "website",
      siteName: "Cyberbay",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.meta_description,
      images: [STRAPI_ASSETS + data.seo.og_image?.data?.attributes?.url || "/favicon.ico"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  // Fetch the blog post data using the id
  // const response = await fetch(`https://api.example.com/blog/${id}`);
  // const data = await response.json();

  // if (!data) {
  //   return <div>Blog post not found</div>;
  // }

  const id = (await params).id;
  const dataPost = await request(`/api/blog-posts/${id}`, {}, "GET");
  const jsonPost = await dataPost.json();

  const dataPosts = request("/api/blog-posts", { page: 1, limit: 5 }, "GET");
  const jsonPosts = await dataPosts.then((res) => res.json());
  const { title, content, thumbnail } = jsonPost;
  return (
    <PageBuilder
      blockComponents={{ hero_section: NewsHero, blog: BlogDetail }}
      blocks={[
        {
          collection: "hero_section",
          overide_background_file: "/images/block-detail-background.png",
          card: {
            cta_modal: null,
            cta_text: "",
            cta_url: "",
            title,
          },
        } as any,
        {
          collection: "blog",
          author: "John Doe",
          createdAt: "2023-10-01",
          banner: `${STRAPI_ASSETS}${thumbnail?.formats?.medium?.url}`,
          content,
          news: jsonPosts.hits,
        },
      ]}
    />
  );
}

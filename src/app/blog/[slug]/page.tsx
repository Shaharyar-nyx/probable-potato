import Image from "next/image";
import { Metadata } from "next";
import { getStrapiAssetUrl, STRAPI_ASSETS } from "@/lib";
import { cache } from "react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nyxlab.com";
const API_URL = "https://shark-app-tmqz4.ondigitalocean.app";

// Cache the fetch to dedupe between generateMetadata and page component
const getCaseStudy = cache(async (slug: string) => {
  try {
    const res = await fetch(
      `${API_URL}/api/case-studies?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();

    // Handle different Strapi response formats
    if (Array.isArray(data)) {
      return data[0] || null;
    }
    if (data?.data && Array.isArray(data.data)) {
      const item = data.data[0];
      return item?.attributes ? { id: item.id, ...item.attributes } : item || null;
    }
    return data[0] || null;
  } catch (error) {
    console.error("Error fetching case study:", error);
    return null;
  }
});

// Generate SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | NyxLab",
      description: "The requested case study could not be found.",
    };
  }

  // Use SEO component data if available, otherwise fallback to main fields
  const seo = caseStudy.seo;
  const title = seo?.title || caseStudy.title || "Case Study";
  const description = seo?.meta_description || caseStudy.short_description || "";
  const keywords = seo?.keywords || [];
  const canonicalUrl = seo?.canonical_url || `${SITE_URL}/blog/${slug}`;
  const noIndex = seo?.no_index || false;
  const noFollow = seo?.no_follow || false;

  // Get OG image
  let ogImage = "/favicon.ico";
  if (seo?.og_image?.data?.attributes?.url) {
    ogImage = getStrapiAssetUrl(seo.og_image.data.attributes.url);
  } else if (caseStudy.image?.[0]?.url) {
    ogImage = getStrapiAssetUrl(caseStudy.image[0].url);
  } else if (caseStudy.image?.data?.[0]?.attributes?.url) {
    ogImage = getStrapiAssetUrl(caseStudy.image.data[0].attributes.url);
  }

  return {
    title: `${title} | NyxLab`,
    description,
    keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords,
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "NyxLab",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: caseStudy.published || caseStudy.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    return <p className="text-center text-gray-400 py-20 text-lg">Case Study not found.</p>;
  }

  const img = caseStudy.image?.[0];

  // Get image URL for structured data
  let imageUrl = "";
  if (img?.url) {
    imageUrl = getStrapiAssetUrl(img.url);
  } else if (caseStudy.image?.data?.[0]?.attributes?.url) {
    imageUrl = getStrapiAssetUrl(caseStudy.image.data[0].attributes.url);
  }

  // JSON-LD Structured Data for Article
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.short_description || "",
    image: imageUrl ? [imageUrl] : [],
    datePublished: caseStudy.published || caseStudy.createdAt,
    dateModified: caseStudy.updatedAt || caseStudy.published || caseStudy.createdAt,
    author: {
      "@type": "Organization",
      name: "NyxLab Research",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "NyxLab",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };

  // Breadcrumb Structured Data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: caseStudy.title,
        item: `${SITE_URL}/blog/${slug}`,
      },
    ],
  };

  return (
    <section className="bg-black text-white pt-5">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
     
      {/* === MAIN CONTENT === */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
        {/* === IMAGE === */}
        {img?.url && (
          <div className="overflow-hidden rounded-2xl shadow-lg mb-10 border border-purple-800/40">
            <Image
              src={getStrapiAssetUrl(img.url)}
              alt={img.alternativeText || caseStudy.title}
              width={900}
              height={500}
              className="object-cover w-full h-[400px] hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        )}

        {/* === META === */}
        <div className="text-sm text-gray-400 mb-4">
          <span className="font-semibold text-purple-400">NyxLab Research</span> •{" "}
          <span>{caseStudy.published}</span> • <span>3 min read</span>
        </div>

        {/* === TITLE === */}
        <h1 className="text-xl md:text-xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent leading-tight">
          {caseStudy.title}
        </h1>

        {/* === SHORT DESCRIPTION === */}
        <p className="text-gray-400 mb-10 text-lg italic border-l-4 border-purple-500 pl-4">
          {caseStudy.short_description}
        </p>

        {/* === MAIN BODY - UPDATED FOR BETTER LIST STYLING === */}
        <div
          className="
            max-w-none
            leading-relaxed
            text-gray-300
            space-y-6
            text-justify

            /* Headings */
            [&>h1]:text-purple-400 [&>h1]:font-extrabold [&>h1]:text-xl [&>h1]:mt-12 [&>h1]:mb-6
            [&>h2]:text-purple-300 [&>h2]:font-semibold [&>h2]:text-xl [&>h2]:mt-10 [&>h2]:mb-4
            [&>h3]:text-purple-200 [&>h3]:font-medium [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3

            /* Paragraphs */
            [&>p]:text-gray-400 [&>p]:leading-relaxed [&>p]:text-lg

            /* Lists - FIXED */
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:my-6
            [&>ul>li]:text-gray-400 [&>ul>li]:leading-relaxed [&>ul>li]:marker:text-purple-400
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:my-6
            [&>ol>li]:text-gray-400 [&>ol>li]:leading-relaxed [&>ol>li]:marker:text-purple-400

            /* Nested Lists */
            [&>ul>li>ul]:list-circle [&>ul>li>ul]:pl-6 [&>ul>li>ul]:mt-2 [&>ul>li>ul]:space-y-1
            [&>ol>li>ol]:list-decimal [&>ol>li>ol]:pl-6 [&>ol>li>ol]:mt-2 [&>ol>li>ol]:space-y-1

            /* Strong and Links */
            [&>strong]:text-pink-400 [&>strong]:font-semibold
            [&>a]:text-pink-400 hover:[&>a]:text-pink-300 [&>a]:underline

            /* Horizontal Rule */
            [&>hr]:border-purple-800/40 [&>hr]:my-8

            /* Blockquotes */
            [&>blockquote]:text-gray-300 [&>blockquote]:border-l-4 [&>blockquote]:border-purple-500 [&>blockquote]:pl-4 [&>blockquote]:py-2 [&>blockquote]:my-6 [&>blockquote]:italic
            
            /* Code */
            [&>code]:bg-gray-800 [&>code]:text-pink-300 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm
          "
          dangerouslySetInnerHTML={{ __html: caseStudy.content }}
        />
      </div>
    </section>
  );
}
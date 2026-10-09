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
      {
        next: { revalidate: 60 },
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_GRAPHQL_API_KEY || '',
        },
      }
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
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-20">
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
            text-left md:text-justify

            /* Headings */
            [&_h1]:text-purple-400 [&_h1]:font-extrabold [&_h1]:text-xl [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:text-left
            [&_h2]:text-purple-300 [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-left
            [&_h3]:text-purple-200 [&_h3]:font-medium [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-left

            /* Paragraphs */
            [&_p]:text-gray-400 [&_p]:leading-relaxed [&_p]:text-base [&_p]:md:text-lg

            /* Lists */
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-6
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-6
            [&_li]:text-gray-400 [&_li]:leading-relaxed [&_li]:marker:text-purple-400

            /* Nested Lists */
            [&_li_ul]:list-[circle] [&_li_ul]:my-2 [&_li_ul]:space-y-1
            [&_li_ol]:my-2 [&_li_ol]:space-y-1

            /* Tables */
            [&_table]:w-full [&_table]:my-8 [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm
            [&_table]:block [&_table]:overflow-x-auto md:[&_table]:table
            [&_thead]:bg-purple-900/30
            [&_th]:border [&_th]:border-purple-800/40 [&_th]:px-4 [&_th]:py-3
            [&_th]:text-purple-200 [&_th]:font-semibold [&_th]:align-top [&_th]:text-left
            [&_td]:border [&_td]:border-purple-800/40 [&_td]:px-4 [&_td]:py-3
            [&_td]:text-gray-400 [&_td]:align-top [&_td]:text-left
            [&_tbody_tr:nth-child(even)]:bg-purple-950/20

            /* Strong and Links */
            [&_strong]:text-pink-400 [&_strong]:font-semibold
            [&_b]:text-pink-400 [&_b]:font-semibold
            [&_a]:text-pink-400 hover:[&_a]:text-pink-300 [&_a]:underline [&_a]:break-words

            /* Images */
            [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-8

            /* Horizontal Rule */
            [&_hr]:border-purple-800/40 [&_hr]:my-8

            /* Blockquotes */
            [&_blockquote]:text-gray-300 [&_blockquote]:border-l-4 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-6 [&_blockquote]:italic

            /* Code */
            [&_code]:bg-gray-800 [&_code]:text-pink-300 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:break-words
            [&_pre]:bg-gray-900 [&_pre]:border [&_pre]:border-purple-800/40 [&_pre]:rounded-lg
            [&_pre]:p-4 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:text-left
            [&_pre]:whitespace-pre [&_pre]:not-italic
            [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-gray-300 [&_pre_code]:whitespace-pre
          "
          dangerouslySetInnerHTML={{
            __html: (caseStudy.content || "").replace(/&nbsp;/g, " "),
          }}
        />
      </div>
    </section>
  );
}
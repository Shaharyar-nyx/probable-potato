"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStrapiAssetUrl } from "@/lib";

type CaseItem = {
  id: string | number;
  title: string;
  slug?: string;
  short_description?: string;
  imageUrl?: string | null;
  blogs_read_time?: number;
  published?: string;
};

export default function CaseStudiesList() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`https://shark-app-tmqz4.ondigitalocean.app/api/case-studies?populate=*`);
        const json = await res.json();
        console.log("📦 raw case-studies response:", json);

        // Many Strapi setups return { data: [ { id, attributes: { ... } } ] }
        // But some projects use different shaping. We'll normalize common possibilities.

        let rawArray: any[] = [];

        if (Array.isArray(json.data)) {
          rawArray = json.data;
        } else if (Array.isArray(json)) {
          // unlikely, but just in case
          rawArray = json;
        } else if (Array.isArray((json as any).results)) {
          rawArray = (json as any).results;
        } else {
          // try to find top-level arrays
          const found = Object.values(json).find((v) => Array.isArray(v));
          rawArray = Array.isArray(found) ? found : [];
        }

        const normalized: CaseItem[] = rawArray.map((item: any) => {
          // item may be { id, attributes: { title, slug, ... } }
          const id = item.id ?? item._id ?? item.attributes?.id ?? Math.random();
          const attrs = item.attributes ?? item;
          const title =
            attrs.title ??
            attrs.name ??
            attrs.attributes?.title ?? // extra deep fallback
            "Untitled Case Study";
          const slug = attrs.slug ?? attrs.attributes?.slug ?? undefined;
          const short_description =
            attrs.short_description ??
            attrs.description ??
            attrs.summary ??
            attrs.attributes?.short_description ??
            "";

          // Image can be in multiple shapes:
          // 1) attrs.image.data.attributes.url
          // 2) attrs.image[0].url
          // 3) attrs.image?.url
          // 4) attrs.image?.data (various)
          let imageUrl: string | null = null;
          try {
            if (attrs.image?.data?.attributes?.url) {
              imageUrl = getStrapiAssetUrl(attrs.image.data.attributes.url);
            } else if (Array.isArray(attrs.image) && attrs.image[0]?.url) {
              imageUrl = getStrapiAssetUrl(attrs.image[0].url);
            } else if (attrs.image?.attributes?.url) {
              imageUrl = getStrapiAssetUrl(attrs.image.attributes.url);
            } else if (attrs.image?.url) {
              imageUrl = getStrapiAssetUrl(attrs.image.url);
            } else if (attrs.image?.data && Array.isArray(attrs.image.data) && attrs.image.data[0]?.attributes?.url) {
              imageUrl = getStrapiAssetUrl(attrs.image.data[0].attributes.url);
            } else {
              imageUrl = null;
            }
          } catch (e) {
            imageUrl = null;
          }

          const blogs_read_time = attrs.blogs_read_time ?? attrs.attributes?.blogs_read_time ?? undefined;
          const published = attrs.published ?? attrs.attributes?.published ?? undefined;

          return {
            id,
            title,
            slug,
            short_description,
            imageUrl,
            blogs_read_time,
            published,
          };
        });

        console.log("✅ normalized cases:", normalized);
        setCases(normalized);
      } catch (err) {
        console.error("❌ fetch case-studies error:", err);
        setCases([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section className="bg-black text-white min-h-screen">
     {/* HERO */}
<section
  className="relative flex items-center justify-start bg-cover bg-center
             px-6 md:px-20 h-[40vh] sm:h-[60vh] lg:h-[80vh] overflow-hidden"
  style={{
    backgroundImage:
      "url('/images/3d-abstract-network-communications-background-with-plexus-design_1048-16800.jpg')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

  {/* Content */}
  <div className="relative z-10 max-w-3xl text-left sm:text-center md:text-left space-y-4 sm:space-y-3">
   <h1
  className="font-bold text-white leading-snug mb-2
             text-lg sm:text-2xl md:text-3xl lg:text-4xl"
>
 Featured Blogs   <br className="hidden sm:block" /> 
</h1>

<p
  className="text-gray-300 leading-relaxed
             text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg mx-auto md:mx-0"
>
Dive into our collection of expert-written blog posts.
Learn something new with every read.</p>


  </div>
</section>

      {/* GRID */}
      <div className="py-20 px-6 md:px-20">
      

        {loading ? (
          <p className="text-center text-gray-400"></p>
        ) : cases.length === 0 ? (
          <p className="text-center text-gray-400"></p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((item) => (
              <article
                key={item.id}
                className="group bg-[#0f0f0f] border border-purple-800/30 rounded-2xl overflow-hidden shadow-md transition-transform hover:-translate-y-2"
              >
                {/* IMAGE */}
                {item.imageUrl ? (
                  <div className="relative w-full h-56 md:h-60 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>
                ) : (
                  <div className="w-full h-56 md:h-60 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center text-gray-500">
                    No image
                  </div>
                )}

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {item.short_description || "No description available."}
                  </p>

                  <Link
                    href={item.slug ? `/blog/${item.slug}` : "#"}
                    className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Learn More →
                  </Link>

                  {/* Published date and Read time */}
                  {(item.blogs_read_time || item.published) && (
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                      {item.published && (
                        <span>
                          {new Date(item.published).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      )}
                      {item.blogs_read_time && (
                        <span>{item.blogs_read_time} min read</span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

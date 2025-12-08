import Image from "next/image";

// Use your production Strapi URL from environment variable
const STRAPI_URL = "https://shark-app-tmqz4.ondigitalocean.app";

async function getCaseStudy(slug: string) {
  const res = await fetch(`https://shark-app-tmqz4.ondigitalocean.app/api/blog?filters[slug][$eq]=${slug}&populate=*`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data[0];
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    return <p className="text-center text-gray-400 py-20 text-lg">Case Study not found.</p>;
  }

  const img = caseStudy.image?.[0];

  return (
    <section className="bg-black text-white">
      {/* === HERO SECTION === */}
      <section
        className="relative h-[90vh] w-full flex items-center justify-start bg-cover bg-center px-10 md:px-20"
        style={{
          backgroundImage:
            "url('/images/pngtree-a-hacker-in-a-hoodie-sitting-at-a-laptop-with-hologram-image_16394239.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

        <div className="relative z-10 max-w-2xl space-y-6">
        <h1
  className="font-bold text-white leading-snug mb-2
             text-lg sm:text-2xl md:text-3xl lg:text-4xl"
>
 Cyber Insights Coming Soon   <br className="hidden sm:block" /> 
</h1>

<p
  className="text-gray-300 leading-relaxed
             text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg mx-auto md:mx-0"
>
We’re preparing expert-backed blogs on cybersecurity, threat intelligence, and real-world case studies.
</p>
<p
  className="text-sm sm:text-base font-bold leading-[1.3] mb-[18px] bg-gradient-to-r from-[#ff00cc] to-[#7928ca] bg-clip-text text-transparent max-w-md sm:max-w-lg mx-auto md:mx-0"
>
  Stay tuned — something powerful is on its way.
</p>
        </div>
      </section>

      {/* === MAIN CONTENT === */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
        {/* === IMAGE === */}
        {img?.url && (
          <div className="overflow-hidden rounded-2xl shadow-lg mb-10 border border-purple-800/40">
            <Image
              src={`${STRAPI_URL}${img.url}`}
              alt={img.alternativeText || caseStudy.title}
              width={900}
              height={500}
              className="object-cover w-full h-[400px] hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        )}

        {/* === META === */}
        <div className="text-sm text-gray-400 mb-4">
          <span className="font-semibold text-purple-400">NyxLab</span> •{" "}
          <span>{caseStudy.published}</span> • <span>3 min read</span>
        </div>

        {/* === TITLE === */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent leading-tight">
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

            /* Headings */
            [&>h1]:text-purple-400 [&>h1]:font-extrabold [&>h1]:text-4xl [&>h1]:mt-12 [&>h1]:mb-6
            [&>h2]:text-purple-300 [&>h2]:font-semibold [&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4
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

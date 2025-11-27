import Image from "next/image";

// Use your production Strapi URL from environment variable
const STRAPI_URL = process.env.NEXT_PUBLIC_Nyxlab_URL;

async function getCaseStudy(slug: string) {
  const res = await fetch(`https://shark-app-tmqz4.ondigitalocean.app/api/case-studies?filters[slug][$eq]=${slug}&populate=*`, {
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
          <h1 className="text-5xl md:text-3xl font-extrabold leading-tight text-white">
            Visibility Into The <br /> Unknown
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
            Our case studies uncover how we transformed raw data into strategic insights — empowering
            clients to stay ahead of evolving digital threats and make data-driven decisions with
            confidence.
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

        {/* === MAIN BODY === */}
       {/* === MAIN BODY === */}
<div
  className="
    prose
    prose-invert
    max-w-none
    leading-relaxed
    text-gray-300

    [&>h1]:text-purple-400 [&>h1]:font-extrabold [&>h1]:text-4xl [&>h1]:mt-12 [&>h1]:mb-6
    [&>h2]:text-purple-300 [&>h2]:font-semibold [&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4
    [&>h3]:text-purple-200 [&>h3]:font-medium [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3

    [&>p]:text-gray-400 [&>p]:leading-relaxed
    [&>ul>li]:text-gray-400 [&>ol>li]:text-gray-400
    [&>strong]:text-pink-400
    [&>a]:text-pink-400 hover:[&>a]:text-pink-300
    [&>hr]:border-purple-800/40
    [&>blockquote]:text-gray-300 [&>blockquote]:border-l-4 [&>blockquote]:border-purple-500 [&>blockquote]:pl-4
  "
  dangerouslySetInnerHTML={{ __html: caseStudy.content }}
/>


      </div>
    </section>
  );
}

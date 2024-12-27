import Image from "next/image";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import styles from "./styles.module.css";
import { heroContent } from "@/data/hero";

const Hero = () => {
  return (
    <header className="relative w-full min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={heroContent.backgroundVideo}
          alt="background animation"
          fill
          className="object-cover z-10 relative"
          priority
        />
      </div>
      <div className={`absolute inset-0 ${styles.overlay}`} />
      <div className="relative max-w-7xl mx-auto h-full z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] items-center py-12 lg:py-20">
          <div className="space-y-6 col-span-2">
            <h1 className="text-[80px] font-primarySemiBold leading-[84px] text-primary-800">
              {heroContent.title}
            </h1>
            <p className="text-md text-primary-800 w-[70%]">
              {heroContent.description}
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              {heroContent.cta.text}
              <Image
                src={heroContent.cta.icon}
                alt="arrow up right"
                width={24}
                height={24}
              />
            </button>
          </div>

          <ParallaxProvider>
            <div className="relative h-[500px] lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-blue-900/30 rounded-2xl overflow-hidden">
                <Parallax translateY={heroContent.styles.parallaxRange.image} className="h-full">
                  <Image
                    src={heroContent.featuredImage.image}
                    alt={heroContent.featuredImage.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </Parallax>

                <Parallax
                  translateY={heroContent.styles.parallaxRange.label}
                  className="absolute bottom-[45%] left-8"
                >
                  <div className="px-4 py-2 rounded-xl bg-black/30 text-[#F6F7F8] flex items-center gap-2 backdrop-blur-sm shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.25)]">
                    {heroContent.featuredImage.monitoringLabel}
                  </div>
                </Parallax>
              </div>
            </div>
          </ParallaxProvider>
        </div>
      </div>
    </header>
  );
};

export default Hero;

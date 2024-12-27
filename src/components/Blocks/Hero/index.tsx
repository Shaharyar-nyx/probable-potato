import Image from "next/image";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

import styles from "./styles.module.css";
import { heroContent } from "@/data/hero";

const Hero = () => {
  return (
    <header className="relative min-h-screen w-full overflow-hidden pt-20">
      <div className="absolute inset-0 h-full w-full">
        <Image
          alt="background animation"
          className="relative z-10 object-cover"
          fill
          priority
          src={heroContent.backgroundVideo}
        />
      </div>
      <div className={`absolute inset-0 ${styles.overlay}`} />
      <div className="relative z-20 mx-auto h-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-[24px] py-12 lg:grid-cols-3 lg:py-20">
          <div className="col-span-2 space-y-6">
            <h1 className="font-primarySemiBold text-[80px] leading-[84px] text-primary-800">{heroContent.title}</h1>
            <p className="w-[70%] text-md text-primary-800">{heroContent.description}</p>
            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700">
              {heroContent.cta.text}
              <Image alt="arrow up right" height={24} src={heroContent.cta.icon} width={24} />
            </button>
          </div>

          <ParallaxProvider>
            <div className="relative h-[500px] lg:h-[600px]">
              <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/10 to-blue-900/30">
                <Parallax className="h-full" translateY={heroContent.styles.parallaxRange.image}>
                  <Image
                    alt={heroContent.featuredImage.alt}
                    className="rounded-2xl"
                    layout="fill"
                    objectFit="cover"
                    src={heroContent.featuredImage.image}
                  />
                </Parallax>

                <Parallax className="absolute bottom-[45%] left-8" translateY={heroContent.styles.parallaxRange.label}>
                  <div className="flex items-center gap-2 rounded-xl bg-black/30 px-4 py-2 text-[#F6F7F8] shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.25)] backdrop-blur-sm">
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

import Image from "next/image";

import { Button } from "@/components/UI";

export const BugBountyPrograms: React.FC = () => {
  return (
    <section className="mx-auto mb-20 w-full max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-bold text-blue-600">
            Building a Future
            <br />
            Ecosystem of
            <br />
            Cybersecurity Excellence
          </h2>
          <p className="mb-6 text-gray-600">
            At Cyberbay, we&#39;re committed to creating an innovative ecosystem where cybersecurity is accessible to
            all. Our platform combines cutting-edge technology with expert guidance to protect organizations in an
            evolving digital landscape.
          </p>
          <Button variant="neutral">Learn More →</Button>
        </div>
        <div className="relative h-[300px]">
          <Image
            alt="Cybersecurity ecosystem diagram"
            className="object-contain"
            fill
            src="/images/ecosystem-diagram.png"
          />
        </div>
      </div>
    </section>
  );
};

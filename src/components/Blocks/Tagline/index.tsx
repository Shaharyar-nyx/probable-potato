import { Button } from "@/components/UI";

const Tagline = () => {
  return (
    <section className="bg-primary-500 px-16 py-[120px] text-neutral-50">
      <div className="flex flex-row items-center gap-[24px]">
        <h3 className="heading-3 w-[60%]">Connect with Cyberbay and join us in building a secure digital future.</h3>

        <div className="w-[30%]">
          <div className="mb-4 text-md">Have questions or need more information? </div>
          <Button variant="neutral">Get in Touch</Button>
        </div>
      </div>
    </section>
  );
};

export default Tagline;

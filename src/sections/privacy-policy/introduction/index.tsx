export const Introduction: React.FC<any> = ({ title, content }) => {
  return (
    <div className="mx-auto max-w-screen-2xl px-6 pt-16 text-primary-800 lg:px-16 lg:pb-10 lg:pt-[120px]">
      <h2 className="heading-2 mb-5">{title}</h2>
      <div className="paragraph-md flex flex-col gap-10" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

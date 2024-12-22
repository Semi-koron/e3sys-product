type SectionProps = {
  title: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  ...props
}: SectionProps) => {
  return (
    <section className="bg-white p-4 rounded-lg">
      <div {...props}>
        <h2 className="text-lg mb-4 text-black">{title}</h2>
        {children}
      </div>
    </section>
  );
};

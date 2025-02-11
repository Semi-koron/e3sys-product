import { Section } from "@/components/ui/Section";

type ProfileProps = {
  name: string;
};

const Profile = ({ name }: ProfileProps) => {
  return (
    <Section title="プロフィール">
      <div className="flex items-center mb-4">
        <div className="bg-gray-400 w-12 h-12 rounded-full mr-4"></div>
        <h2 className="text-base text-black">{name}</h2>
      </div>
      <p className="text-black">プロフィール情報</p>
    </Section>
  );
};

export default Profile;
